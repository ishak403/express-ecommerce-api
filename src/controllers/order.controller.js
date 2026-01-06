const {
  Cart,
  CartItem,
  Order,
  OrderItem,
  Product,
  User,
  sequelize,
} = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * POST /api/orders
 * Create order from cart
 */
exports.createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
    });

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // Fetch cart items with associated products
    const cartItems = await CartItem.findAll({
      where: { CartId: cart.id },
      include: [
        {
          model: Product,
          attributes: ["id", "price"], // only what you need
        },
      ],
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + item.Product.price * item.quantity;
    }, 0);

    // Create order
    const order = await Order.create({
      UserId: req.user.id,
      total,
      status: "pending",
    });

    // Create order items
    for (const item of cartItems) {
      await OrderItem.create({
        OrderId: order.id,
        ProductId: item.Product.id,
        price: item.Product.price,
        quantity: item.quantity,
      });
    }

    // Clear the cart
    await CartItem.destroy({ where: { CartId: cart.id } });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/orders/my
 * User order history
 */
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: {
        model: Product,
        through: { attributes: ["quantity", "price"] },
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders
 * Admin: view all orders
 */
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Product,
          through: { attributes: ["quantity", "price"] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/orders/:id/status
 * Admin: update order status
 */
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["pending", "paid", "shipped"];

    if (!allowedStatuses.includes(status)) {
      throw new ApiError(400, "Invalid order status");
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      status,
    });
  } catch (error) {
    next(error);
  }
};
