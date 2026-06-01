import request from "supertest";
import { createApp } from "../api/app.js";
import { authMiddlewareMockFn } from "./__mocks__/index.js";

describe("Health check", () => {
  const app = createApp(authMiddlewareMockFn);

  it("should return health check status OK", async () => {
    const res = await request(app).get("/status");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("OK");
  });
});
