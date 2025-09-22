import mongoose, { Schema } from "mongoose";
import { IConsultation } from "../types";
import SymptomSchema from "./Symptom";



const ConsultationSchema = new Schema<IConsultation>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  symptoms: [SymptomSchema],
  painLevel: { type: Number, required: true },
  additionalDetails: { type: String, required: true },
  riskAssessment: {
    level: { type: String, enum: ["low", "medium", "high"], required: true },
    factors: [{ type: String, required: true }],
  },
  recommendations: [{ type: String, required: true }],
  nextActions: [{ type: String, required: true }],
  status: { type: String, enum: ["in-progress", "completed"], required: true },
  consultationDuration: { type: Number, required: true },
}, { timestamps: true });

const Consultation = mongoose.model<IConsultation>("Consultation", ConsultationSchema);

export default Consultation;
