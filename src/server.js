require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
  try {
    // Validate DB connection
    await sequelize.authenticate();
    logger.info("Database connection established");

    await sequelize.sync();
    logger.info("Database synced");

    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} (${NODE_ENV})`);
    });

    /* ======================
       Graceful Shutdown
    ====================== */
    const shutdown = async (signal) => {
      logger.warn(`Received ${signal}. Shutting down gracefully...`);
      await sequelize.close();
      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

/* ======================
   Process-level Errors
====================== */
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", error);
  process.exit(1);
});

startServer();
