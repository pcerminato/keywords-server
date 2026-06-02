import { Router } from "express";
import { makeKeywordController } from "./controller.js";
import { DB } from "../../interfaces/index.js";

export function makeKeywordRouter(database: DB) {
  const router = Router();
  const {
    findLists,
    findOneList,
    insertOneList,
  } = makeKeywordController(database);

  router.post("/", insertOneList);
  router.get("/", findLists);
  router.get("/:id", findOneList);

  return router;
}
