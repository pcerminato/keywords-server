import request from "supertest";
import app from "../app.js";

//import { insertOne } from "../db/crud/index.js";
import { disconnectDb, runDbConnection } from "../db/connection.js";

//jest.mock("../db/crud/insert-one");

describe("Keyword router", () => {
  beforeAll(async () => {
    await runDbConnection();
  });
  afterAll(async () => {
    await disconnectDb();
  });

  describe("Insert one", () => {
    it("should return error if the requst body is not defined", async () => {
      const res = await request(app).post("/keywords-list").send();

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Request body is not defined");
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
      //(insertOne as jest.Mock).mockResolvedValue(keyword);

      const res = await request(app).post("/keywords-list").send(keyword);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(keyword);
    });
  });
});
