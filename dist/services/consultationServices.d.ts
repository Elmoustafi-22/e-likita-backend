import { IConsultation, IConsultationResponse, ISymptom, IFollowUp } from "../types";
export declare const createConsultation: (consultationData: Omit<IConsultation, "_id">) => Promise<IConsultationResponse>;
export declare const getAllConsultations: () => Promise<IConsultationResponse[]>;
export declare const getConsultationById: (id: string) => Promise<IConsultationResponse | null>;
export declare const addSymptoms: (id: string, symptoms: ISymptom[]) => Promise<IConsultationResponse | null>;
export declare const addFollowUps: (id: string, _followUps: IFollowUp[]) => Promise<IConsultationResponse | null>;
export declare const generateSummary: (id: string) => Promise<IConsultationResponse | null>;
export declare const updateConsultation: (id: string, consultationData: Partial<IConsultation>) => Promise<IConsultationResponse | null>;
//# sourceMappingURL=consultationServices.d.ts.map