import mongoose from "mongoose";

const requirementSessionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    extracted: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("RequirementSession", requirementSessionSchema);
