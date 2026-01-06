const sequelize = require("../config/database");

const User = require("./user.model");
const Product = require("./product.model");
const Cart = require("./cart.model");
const CartItem = require("./cartItem.model");
const Order = require("./order.model");
const OrderItem = require("./orderItem.model");

/* ======================
   User ↔ Cart
====================== */
User.hasOne(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User);

/* ======================
   Cart ↔ Product (M:N)
====================== */
Cart.belongsToMany(Product, {
  through: CartItem,
  foreignKey: "CartId",
});
Product.belongsToMany(Cart, {
  through: CartItem,
  foreignKey: "ProductId",
});

CartItem.belongsTo(Product);
CartItem.belongsTo(Cart);
Product.hasMany(CartItem);
Cart.hasMany(CartItem);

/* ======================
   User ↔ Order
====================== */
User.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(User);

/* ======================
   Order ↔ Product (M:N)
====================== */
Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: "OrderId",
});
Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "ProductId",
});

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
