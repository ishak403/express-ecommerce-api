const swaggerJsdoc = require("swagger-jsdoc");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Express E-Commerce API",
      version: "1.0.0",
      description:
        "RESTful E-Commerce API built with Node.js, Express, PostgreSQL, and Sequelize",
    },
    servers: [
      {
        url: BASE_URL,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
