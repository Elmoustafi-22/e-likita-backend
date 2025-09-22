import Patient from "../models/Patient";
import { IPatient } from "../types";

type PatientData = Omit<IPatient, "_id" | "__v" | "createdAt" | "updatedAt">;

export const createPatient = async (patientData: PatientData) => {
    return await Patient.create(patientData);
};

export const getAllPatients = async (): Promise<IPatient[]> => {
  return await Patient.find();
};

export const getPatientById = async (id: string): Promise<IPatient | null> => {
  return await Patient.findById(id);
};

export const updatePatient = async (id: string, patientData: Partial<IPatient>): Promise<IPatient | null> => {
  return await Patient.findByIdAndUpdate(id, patientData, { new: true });
};

export const deletePatient = async (id: string): Promise<IPatient | null> => {
  return await Patient.findByIdAndDelete(id);
};
