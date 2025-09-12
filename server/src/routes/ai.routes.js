import { Router } from "express";
import RequirementSession from "../models/RequirementSession.js";
import { extractRequirements } from "../services/openai.service.js";

const router = Router();


router.post("/extract", async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    /*Extract requirements using only the prompt*/
    const extracted = await extractRequirements({ prompt });

    /*Persist the session*/
    const session = await RequirementSession.create({
      prompt,
      extracted
    });

    res.json({ sessionId: session._id, extracted });
  } catch (e) {
    res.status(500).json({ error: e.message || "Extraction failed" });
  }
});

export default router;