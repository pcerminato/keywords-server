import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authenticationToken, errorHandler } from "./middleware";
import sentimentRouter from "./sentiment/routes";
import loginRouter from "./auth/routes";
import ai from "./ai/routes";
import config from "./config";

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
app.use("/sentiment-list", authenticationToken, sentimentRouter);
app.use("/ai", authenticationToken, ai);
app.use(errorHandler);

export default app;
