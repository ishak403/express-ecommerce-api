const { Sequelize } = require("sequelize");
require("dotenv").config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_SSL,
  NODE_ENV,
} = process.env;

// 🔐 Basic env validation
if (!DB_NAME || !DB_USER || !DB_HOST) {
  throw new Error("Missing required database environment variables");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 5432,
  dialect: "postgres",

  /* ======================
     Connection Pooling
  ====================== */
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  /* ======================
     Logging
  ====================== */
  logging: NODE_ENV === "development" ? console.log : false,

  /* ======================
     SSL Support (Cloud)
  ====================== */
  dialectOptions:
    DB_SSL === "true"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},

  /* ======================
     Timezone
  ====================== */
  timezone: "+00:00",
});

module.exports = sequelize;
