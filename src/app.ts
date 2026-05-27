import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authenticationToken, errorHandler } from "./middleware/index.js";
import keywordRouter from "./keyword/routes.js";
import loginRouter from "./auth/routes.js";
import ai from "./ai/routes.js";
import config from "./config/index.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: config.UI_URL,
  credentials: true,
}));
app.use(cookieParser());

app.get("/status", (_, res) => {
  res.status(200).json({
    message: "OK",
    date: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/login", loginRouter);
app.use("/keywords-list", authenticationToken, keywordRouter);
app.use("/ai", authenticationToken, ai);
app.use(errorHandler);

export default app;
