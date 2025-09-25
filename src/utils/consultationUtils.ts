import {
  IConsultation,
  IConsultationResponse,
  ISymptom,
  IFollowUp,
} from "../types";

// Calculate risk assessment based on symptoms and follow-ups
export const calculateRiskAssessment = (
  symptoms: ISymptom[],
  followUps?: IFollowUp[]
  
) => {
const urgentSymptoms = [
    "Chest Pain",
    "Fever/High Temperature",
    "Severe Headache",
    "Difficulty Breathing",
];

const reportedUrgentSymptoms = symptoms
    .filter(s => s.symptoms?.some(symptom => urgentSymptoms.includes(symptom)))
    .map(s => s.symptoms?.find(symptom => urgentSymptoms.includes(symptom)))
    .filter(Boolean) as string[];

const hasUrgentSymptoms = reportedUrgentSymptoms.length > 0;

  const painSeverity = symptoms.reduce(
    (acc, s) => Math.max(acc, s.severity || 0),
    0
  );

  if (hasUrgentSymptoms && painSeverity > 7) {
    return {
      level: "high" as const,
      factors: ["Severe headache reported", "High pain level"],
    };
  } else if (painSeverity > 5) {
    return {
      level: "medium" as const,
      factors: ["Moderate pain level reported"],
    };
  }

  return {
    level: "low" as const,
    factors: ["No major risk factors identified"],
  };
};

// Generate recommendations based on risk assessment
export const generateRecommendations = (riskLevel: string) => {
  switch (riskLevel) {
    case "high":
      return [
        "Seek immediate medical attention at the emergency department",
        "Do not delay - call emergency services if symptoms worsen",
      ];
    case "medium":
      return [
        "Schedule an appointment with your healthcare provider within 24-48 hours",
        "Monitor symptoms closely and seek immediate care if they worsen",
      ];
    default:
      return [
        "Monitor your symptoms",
        "Rest and drink plenty of fluids",
        "Consider over-the-counter pain relief if appropriate",
      ];
  }
};

// Generate next actions based on risk level
export const generateNextActions = (riskLevel: string) => {
  switch (riskLevel) {
    case "high":
      return [
        "Visit Emergency Department immediately",
        "Call emergency services: 911",
      ];
    case "medium":
      return [
        "Contact healthcare provider within 24 hours",
        "Keep a symptom diary",
      ];
    default:
      return [
        "Schedule a follow-up appointment if symptoms persist",
        "Self-monitor for 24-48 hours",
      ];
  }
};

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
  // You can add logic here based on your business rules
  // For example, mark as completed if consultation is older than X hours
  const hoursSinceCreation =
    (new Date().getTime() - new Date(consultation.createdAt!).getTime()) /
    (1000 * 60 * 60);
  return hoursSinceCreation > 2 ? "completed" : "in-progress";
};

// Main function to enhance consultation with calculated fields
export const enhanceConsultationWithCalculations = (
  consultation: IConsultation
): IConsultationResponse => {
  const riskAssessment = calculateRiskAssessment(consultation.symptoms, []);
  const recommendations = generateRecommendations(riskAssessment.level);
  const nextActions = generateNextActions(riskAssessment.level);
  const consultationDuration = calculateConsultationDuration(
    consultation.createdAt!
  );
  const status = determineConsultationStatus(consultation);

  return {
    ...consultation,
    riskAssessment,
    recommendations,
    nextActions,
    status,
    consultationDuration,
  };
};
