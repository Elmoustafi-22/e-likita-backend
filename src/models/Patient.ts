import mongoose, { Schema, Document } from "mongoose";
import { IPatient } from "../types";

interface IPatientDocument extends Omit<IPatient, '_id'>, Document {}

const PatientSchema = new Schema<IPatientDocument>({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  medicalHistory: {
    type: [String],
    required: true,
  },
  knownAllergies: {
    type: [String],
    required: true,
  },
  currentMedications: {
    type: [String],
    required: true,
  },
}, {timestamps: true});

const Patient = mongoose.model<IPatientDocument>("Patient", PatientSchema);

export default Patient;