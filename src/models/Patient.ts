import mongoose, { Schema } from "mongoose";
import { IPatient } from "../types";


const PatientSchema = new Schema<IPatient>({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  medicalHistory: {
    type: [String],
  },
  currentMedications: {
    type: String,
  },
}, {timestamps: true});

const Patient = mongoose.model<IPatient>("Patient", PatientSchema);

export default Patient;