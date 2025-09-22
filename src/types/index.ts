export interface IPatient {
    _id?: string;
    fullName: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    phone: string;
    medicalHistory: string[];
    knownAllergies: string[];
    currentMedications: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISymptom {
    symptoms: string[];
    duration: string;
    severity: number;
    additionalDetails?:string;
}

export interface IFollowUp {
    painlocation: string;
    description: string;
}

export interface IConsultation {
  _id?: string;
  patient: string; // Patient ID
  symptoms: ISymptom[];
  painLevel: number;
  additionalDetails: string;
  riskAssessment: {
    level: "low" | "medium" | "high";
    factors: string[];
  };
  recommendations: string[];
  nextActions: string[];
  status: "in-progress" | "completed";
  consultationDuration: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRiskFactor {
  symptom: string;
  severity: number;
  keywords: string[];
  riskScore: number;
}