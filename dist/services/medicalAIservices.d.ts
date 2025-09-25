import { ISymptom, IFollowUp, IPatient } from "../types";
export declare class MedicalAIService {
    generateRiskAssessment(symptoms: ISymptom[], painLevel: number, followUps?: IFollowUp[], patientInfo?: IPatient): Promise<{
        level: "low" | "medium" | "high";
        factors: string[];
        confidence: number;
        reasoning: string;
    }>;
    generateRecommendations(riskLevel: string, symptoms: ISymptom[], painLevel: number, followUps?: IFollowUp[], patientInfo?: IPatient): Promise<{
        recommendations: string[];
        nextActions: string[];
        urgency: "immediate" | "soon" | "routine";
        redFlags: string[];
    }>;
    private buildRiskAssessmentPrompt;
    private buildRecommendationsPrompt;
    private fallbackRiskAssessment;
    private fallbackRecommendations;
}
//# sourceMappingURL=medicalAIservices.d.ts.map