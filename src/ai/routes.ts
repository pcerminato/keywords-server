import { Router } from "express";
import { callAI } from "./controller.js";

const router = Router();

router.post("/", callAI);

export default router;
