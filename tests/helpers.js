const request = require("supertest");
const app = require("../src/app");
const { User } = require("../src/models");

exports.createAdminAndLogin = async () => {
  const email = `admin_${Date.now()}@test.com`;

  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email,
    password: "admin123",
  });

  await User.update({ role: "admin" }, { where: { email } });

  const res = await request(app).post("/api/auth/login").send({
    email,
    password: "admin123",
  });

  if (!res.body.token) {
    throw new Error("Admin login failed in test helper");
  }

  return res.body.token;
};

exports.createUserAndLogin = async () => {
  const email = `user_${Date.now()}@test.com`;

  await request(app).post("/api/auth/register").send({
    name: "User",
    email,
    password: "password123",
  });

  const res = await request(app).post("/api/auth/login").send({
    email,
    password: "password123",
  });

  if (!res.body.token) {
    throw new Error("User login failed in test helper");
  }

  return res.body.token;
};

exports.createProduct = async (adminToken) => {
  const res = await request(app)
    .post("/api/products")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Test Product",
      description: "",
      price: 100,
      category: "Test",
      stock: 10,
    });

  const productId = res.body?.product?.id;

  if (res.statusCode !== 201 || !productId) {
    console.error("Product creation failed:", res.body);
    throw new Error("createProduct helper failed");
  }

  return Number(productId);
};

