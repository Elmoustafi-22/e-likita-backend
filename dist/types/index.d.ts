export interface IPatient {
    _id?: string;
    fullName: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    phone: string;
    medicalHistory: string[];
    knownAllergies: string[];
    currentMedications: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ISymptom {
    symptoms: string[];
    duration: string;
    severity: number;
    additionalDetails?: string;
}
export interface IFollowUp {
    painlocation: string;
    description: string;
}
export interface IConsultation {
    _id?: string;
    patient: string;
    symptoms: ISymptom[];
    followUps?: IFollowUp[];
    painLevel: number;
    additionalDetails: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IConsultationResponse extends IConsultation {
    riskAssessment: {
        level: "low" | "medium" | "high";
        factors: string[];
        confidence?: number;
        reasoning?: string;
    };
    recommendations: string[];
    nextActions: string[];
    status: "in-progress" | "completed";
    consultationDuration: number;
}
export interface IRiskFactor {
    symptom: string;
    severity: number;
    keywords: string[];
    riskScore: number;
}
//# sourceMappingURL=index.d.ts.map