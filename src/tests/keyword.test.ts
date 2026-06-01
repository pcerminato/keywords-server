import request from "supertest";
import { type Express } from "express";
import { createApp } from "../api/app.js";
import { DbConnection } from "../infrastructure/db/connection.js";
import { insertOne } from "../infrastructure/db/crud/index.js";
import { authMiddlewareMockFn } from "./__mocks__/index.js";

jest.mock("../infrastructure/db/crud/insert-one");

describe("Keyword router", () => {
  let { connect, disconnect } = DbConnection();
  let app: Express;

  beforeAll(async () => {
    await connect();
    app = createApp(authMiddlewareMockFn);
  });
  afterAll(async () => {
    await disconnect();
  });

  describe("Insert one", () => {
    it("should return error if the request body is not defined", async () => {
      const res = await request(app).post("/keywords-list").send({});

      expect(authMiddlewareMockFn).toHaveBeenCalled();
      expect(res.status).toBe(422);
      expect(res.body.message).toBe("A name must be set for a keywords record");
    });

    it("should successfully create a new list", async () => {
      const keyword = {
        "name": "Description of an example",
        "createdAt": "2026-03-28T01:47:24.732Z",
        "lastUpdateAt": "2026-03-28T02:28:03.905Z",
        "lists": {
          "accepted": ["health", "nutrition", "meditation"],
          "denied": ["diabeted", "obecity", "stress"],
        },
      };
      (insertOne as jest.Mock).mockResolvedValue(keyword);

      const res = await request(app).post("/keywords-list").send(keyword);

      expect(authMiddlewareMockFn).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual(keyword);
    });
  });
});
