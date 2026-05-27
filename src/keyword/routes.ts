import { Router } from "express";
import { findLists, findOneList, insertOneList } from "./controller.js";

const router = Router();

router.post("/", insertOneList);
router.get("/", findLists);
router.get("/:id", findOneList);

export default router;
