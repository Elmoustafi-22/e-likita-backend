import { IPatient } from "../types";
type PatientData = Omit<IPatient, "_id" | "__v" | "createdAt" | "updatedAt">;
export declare const createPatient: (patientData: PatientData) => Promise<import("mongoose").Document<unknown, {}, IPatient, {}, {}> & IPatient & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const getAllPatients: () => Promise<IPatient[]>;
export declare const getPatientById: (id: string) => Promise<IPatient | null>;
export declare const updatePatient: (id: string, patientData: Partial<IPatient>) => Promise<IPatient | null>;
export declare const deletePatient: (id: string) => Promise<IPatient | null>;
export {};
//# sourceMappingURL=patientServices.d.ts.map