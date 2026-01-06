const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const errorHandler = require("./middleware/error.middleware");
const requestLogger = require("./middleware/logger.middleware");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

/* ======================
   Global Middleware
====================== */

// Enable CORS
app.use(cors());

// Parse JSON with size limit (security)
app.use(express.json({ limit: "10kb" }));

// Request logging
app.use(requestLogger);

/* ======================
   Health Check
====================== */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

/* ======================
   Swagger Documentation
====================== */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

/* ======================
   API Routes (Versioned)
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

/* ======================
   404 Handler
====================== */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ======================
   Global Error Handler
====================== */
app.use(errorHandler);

module.exports = app;
