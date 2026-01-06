const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = sequelize.define("OrderItem", {
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
});
