import { Schema } from "mongoose";
import { ISymptom } from "../types";

const SymptomSchema = new Schema<ISymptom>({
  symptoms: [{ type: String, required: true }],
  duration: { type: String, required: true },
  severity: { type: Number, required: true },
  additionalDetails: { type: String },
}, { _id: false });

export default SymptomSchema;
