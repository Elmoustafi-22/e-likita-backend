import {
  IConsultation,
  IConsultationResponse,
} from "../types";
import { MedicalAIService } from "../services/medicalAIservices";

// Calculate consultation duration
export const calculateConsultationDuration = (createdAt: Date): number => {
  return Math.round(
    (new Date().getTime() - new Date(createdAt).getTime()) / 1000 / 60
  );
};

// Determine consultation status
export const determineConsultationStatus = (
  consultation: IConsultation
): "in-progress" | "completed" => {
  const hoursSinceCreation =
    (new Date().getTime() - new Date(consultation.createdAt!).getTime()) /
    (1000 * 60 * 60);
  return hoursSinceCreation > 2 ? "completed" : "in-progress";
};

// Main function to enhance consultation with calculated fields
export const enhanceConsultationWithCalculations = async (
  consultation: IConsultation
): Promise<IConsultationResponse> => {
  const aiService = new MedicalAIService();

  const symptoms = consultation.symptoms;
  const painLevel = symptoms.reduce(
    (acc, s) => Math.max(acc, s.severity || 0),
    0
  );
  // The followUps field is not in the schema, so we check for it dynamically
  const followUps = (consultation as any).followUps || [];
  const patientInfo = consultation.patient;

  try {
    const riskAssessment = await aiService.generateRiskAssessment(
      symptoms,
      painLevel,
      followUps,
      patientInfo
    );

    const recommendationsResult = await aiService.generateRecommendations(
      riskAssessment.level,
      symptoms,
      painLevel,
      followUps,
      patientInfo
    );

    const consultationDuration = calculateConsultationDuration(
      consultation.createdAt!
    );
    const status = determineConsultationStatus(consultation);

    return {
      ...consultation,
      riskAssessment,
      recommendations: recommendationsResult.recommendations,
      nextActions: recommendationsResult.nextActions,
      status,
      consultationDuration,
    };
  } catch (error) {
    console.error("Error enhancing consultation with AI:", error);
    // Fallback to a simple enhancement if AI fails
    const consultationDuration = calculateConsultationDuration(
      consultation.createdAt!
    );
    const status = determineConsultationStatus(consultation);
    return {
      ...consultation,
      riskAssessment: {
        level: "medium",
        factors: ["AI service unavailable"],
        confidence: 0.1,
        reasoning: "Error connecting to AI.",
      },
      recommendations: ["Consult a healthcare provider."],
      nextActions: ["Schedule an appointment."],
      status,
      consultationDuration,
    };
  }
};
