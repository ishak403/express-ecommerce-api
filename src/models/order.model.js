const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = sequelize.define("Order", {
  status: {
    type: DataTypes.ENUM("pending", "paid", "shipped"),
    defaultValue: "pending",
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 },
  },
});
