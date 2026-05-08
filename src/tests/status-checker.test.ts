import request from "supertest";
import app from "../app.js";

describe("Health check", () => {
  it("should return health check status OK", async () => {
    const res = await request(app).get("/status");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("OK");
  });
});
