import { Schema } from "mongoose";
import { IRiskFactor } from "../types";

const RiskFactorSchema = new Schema<IRiskFactor>({
  symptom: { type: String, required: true },
  severity: { type: Number, required: true },
  keywords: [{ type: String, required: true }],
  riskScore: { type: Number, required: true },
}, { _id: false });

export default RiskFactorSchema;
