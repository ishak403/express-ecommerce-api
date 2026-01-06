const request = require("supertest");
const app = require("../src/app");
const {
  createAdminAndLogin,
  createUserAndLogin,
  createProduct,
} = require("./helpers");

describe("Cart API", () => {
  let userToken;
  let productId;

  beforeAll(async () => {
    const adminToken = await createAdminAndLogin();
    productId = await createProduct(adminToken);
    userToken = await createUserAndLogin();
  });

  it("should add item to cart", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId, quantity: 2 });

    expect(res.statusCode).toBe(200);
  });

  it("should get cart contents", async () => {
    const res = await request(app)
      .get("/api/cart")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
  });
});
