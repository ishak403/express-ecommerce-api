const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {
  let email;

  beforeAll(() => {
    email = `testuser_${Date.now()}@test.com`; // 👈 UNIQUE
  });

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email,
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
  });

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email,
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
