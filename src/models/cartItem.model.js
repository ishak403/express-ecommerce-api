const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = sequelize.define("CartItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});
