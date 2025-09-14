import { Router } from "express";
import RequirementSession from "../models/RequirementSession.js";
import { extractRequirements } from "../services/openai.service.js";

const router = Router();

router.post("/extract", async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    const extracted = await extractRequirements({ prompt });

    const session = await RequirementSession.create({
      prompt,
      extracted,
    });

    res.json({ sessionId: session._id, extracted });
  } catch (e) {
    res.status(500).json({ error: e.message || "Extraction failed" });
  }
});

export default router;
