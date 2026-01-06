const request = require("supertest");
const app = require("../src/app");
const {
  createAdminAndLogin,
  createUserAndLogin,
  createProduct,
} = require("./helpers");

describe("Order API", () => {
  let userToken;
  let productId;

  beforeAll(async () => {
    const adminToken = await createAdminAndLogin();
    productId = await createProduct(adminToken);
    userToken = await createUserAndLogin();

    const cartRes = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId, quantity: 2 });

    expect(cartRes.statusCode).toBe(200);
  });

  it("should create order from cart", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(201);
  });

  it("should get user order history", async () => {
    const res = await request(app)
      .get("/api/orders/my")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.orders)).toBe(true);
  });
});
