const request = require("supertest");
const app = require("../src/app");
const { createAdminAndLogin, createProduct } = require("./helpers");

describe("Product API", () => {
  let adminToken;
  let productId;

  beforeAll(async () => {
    adminToken = await createAdminAndLogin();
    productId = await createProduct(adminToken);

    expect(productId).toBeDefined();
  });

  it("should fetch products using search API", async () => {
    const res = await request(app)
      .post("/api/products/search")
      .send({});

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it("should fetch product by id", async () => {
    const res = await request(app).get(`/api/products/${productId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.product.id).toBe(productId);
  });
});
