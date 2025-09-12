import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.get("/", (_, res) => res.json({ ok: true, service: "mini-ai-app" }));


app.use("/api/ai", aiRoutes);


mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`API running on http://localhost:${env.PORT}`);
    });
  })
  .catch(err => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });