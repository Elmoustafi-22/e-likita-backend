import mongoose, { Schema } from "mongoose";
import { IConsultation } from "../types";
import SymptomSchema from "./Symptom";



const ConsultationSchema = new Schema<IConsultation>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  symptoms: [SymptomSchema],
  painLevel: { type: Number, required: true },
  additionalDetails: { type: String, required: true },
}, { timestamps: true });

const Consultation = mongoose.model<IConsultation>("Consultation", ConsultationSchema);

export default Consultation;
