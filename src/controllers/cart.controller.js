const { Cart, Product, CartItem } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * GET /api/cart
 * View cart contents + totals
 */
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
      include: {
        model: Product,
        through: { attributes: ["quantity"] },
      },
    });

    if (!cart || cart.Products.length === 0) {
      return res.status(200).json({
        success: true,
        items: [],
        total: 0,
      });
    }

    let total = 0;

    const items = cart.Products.map((product) => {
      const quantity = product.CartItem.quantity;
      const itemTotal = product.price * quantity;
      total += itemTotal;

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        itemTotal,
      };
    });

    res.status(200).json({
      success: true,
      items,
      total,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/cart
 * Add item to cart (or update quantity)
 */
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (product.stock < quantity) {
      throw new ApiError(400, "Insufficient product stock");
    }

    const cart = await Cart.findOne({ where: { UserId: req.user.id } });

    const existingItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductId: productId },
    });

    if (existingItem) {
      const newQty = existingItem.quantity + quantity;

      if (newQty > product.stock) {
        throw new ApiError(400, "Quantity exceeds available stock");
      }

      existingItem.quantity = newQty;
      await existingItem.save();
    } else {
      await CartItem.create({
        CartId: cart.id,
        ProductId: productId,
        quantity,
      });
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/cart/:productId
 * Update item quantity
 */
exports.updateQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (quantity > product.stock) {
      throw new ApiError(400, "Quantity exceeds available stock");
    }

    const cart = await Cart.findOne({ where: { UserId: req.user.id } });

    const cartItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductId: productId },
    });

    if (!cartItem) {
      throw new ApiError(404, "Item not found in cart");
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart quantity updated",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/cart/:productId
 * Remove item from cart
 */
exports.removeItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ where: { UserId: req.user.id } });

    const deleted = await CartItem.destroy({
      where: { CartId: cart.id, ProductId: productId },
    });

    if (!deleted) {
      throw new ApiError(404, "Item not found in cart");
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    next(error);
  }
};
