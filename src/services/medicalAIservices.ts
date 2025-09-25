import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { ISymptom, IFollowUp, IPatient } from "../types";
import { config } from "dotenv";

config();

// Initialize Google AI client
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// Define Zod schemas for AI responses
const riskAssessmentSchema = z.object({
  level: z.enum(["low", "medium", "high"]),
  factors: z.array(z.string()),
  confidence: z.number(),
  reasoning: z.string(),
});

const recommendationsSchema = z.object({
  recommendations: z.array(z.string()),
  nextActions: z.array(z.string()),
  urgency: z.enum(["immediate", "soon", "routine"]),
  redFlags: z.array(z.string()),
});

export class MedicalAIService {
  // Generate AI-powered risk assessment
  async generateRiskAssessment(
    symptoms: ISymptom[],
    painLevel: number,
    followUps: IFollowUp[] = [],
    patientInfo?: IPatient
  ) {
    const prompt = this.buildRiskAssessmentPrompt(
      symptoms,
      painLevel,
      followUps,
      patientInfo
    );

    try {
      const { object } = await generateObject({
        model: google("models/gemini-1.5-flash"),
        schema: riskAssessmentSchema,
        system: `You are a medical triage AI assistant. Analyze symptoms and provide risk assessment.
                 Always be conservative - when in doubt, recommend higher care level.`,
        prompt,
        temperature: 0.1,
      });
      return object;
    } catch (error) {
      console.error("AI Risk Assessment Error:", error);
      // Fallback to rule-based assessment
      return this.fallbackRiskAssessment(symptoms, painLevel);
    }
  }

  // Generate AI-powered recommendations
  async generateRecommendations(
    riskLevel: string,
    symptoms: ISymptom[],
    painLevel: number,
    followUps: IFollowUp[] = [],
    patientInfo?: IPatient
  ) {
    const prompt = this.buildRecommendationsPrompt(
      riskLevel,
      symptoms,
      painLevel,
      followUps,
      patientInfo
    );

    try {
      const { object } = await generateObject({
        model: google("models/gemini-1.5-pro"), // Using a more powerful model for recommendations
        schema: recommendationsSchema,
        system: `You are a medical triage AI providing care recommendations.
                 Always prioritize patient safety. Be specific and actionable.`,
        prompt,
        temperature: 0.1,
      });
      return object;
    } catch (error) {
      console.error("AI Recommendations Error:", error);
      // Fallback to rule-based recommendations
      return this.fallbackRecommendations(riskLevel, symptoms, painLevel);
    }
  }

  // Build detailed prompt for risk assessment
  private buildRiskAssessmentPrompt(
    symptoms: ISymptom[],
    painLevel: number,
    followUps: IFollowUp[],
    patientInfo?: IPatient
  ) {
    let prompt = `PATIENT MEDICAL ASSESSMENT\n\n`;

    // Add patient demographics if available
    if (patientInfo) {
      prompt += `PATIENT INFORMATION:\n`;
      prompt += `- Age: ${patientInfo.age}\n`;
      prompt += `- Gender: ${patientInfo.gender}\n`;
      if (patientInfo.medicalHistory && patientInfo.medicalHistory.length > 0) {
        prompt += `- Medical History: ${patientInfo.medicalHistory.join(
          ", "
        )}\n`;
      }
      if (patientInfo.knownAllergies && patientInfo.knownAllergies.length > 0) {
        prompt += `- Known Allergies: ${patientInfo.knownAllergies.join(
          ", "
        )}\n`;
      }
      if (patientInfo.currentMedications) {
        prompt += `- Current Medications: ${patientInfo.currentMedications}\n`;
      }
      prompt += `\n`;
    }

    // Add symptoms information
    prompt += `SYMPTOMS REPORTED:\n`;
    symptoms.forEach((symptomGroup, index) => {
      prompt += `Symptom Group ${index + 1}:\n`;
      if (symptomGroup.symptoms && symptomGroup.symptoms.length > 0) {
        prompt += `  - Symptoms: ${symptomGroup.symptoms.join(", ")}\n`;
      }
      prompt += `  - Severity: ${symptomGroup.severity}/10\n`;
      prompt += `  - Duration: ${symptomGroup.duration}\n`;
      if (symptomGroup.additionalDetails) {
        prompt += `  - Additional Details: ${symptomGroup.additionalDetails}\n`;
      }
      prompt += `\n`;
    });

    prompt += `OVERALL PAIN LEVEL: ${painLevel}/10\n\n`;

    // Add follow-up information about pain location and description
    if (followUps.length > 0) {
      prompt += `PAIN CHARACTERISTICS:\n`;
      followUps.forEach((followUp, index) => {
        prompt += `Assessment ${index + 1}:\n`;
        prompt += `  - Pain Location: ${followUp.painlocation}\n`;
        prompt += `  - Pain Description: ${followUp.description}\n`;
      });
      prompt += `\n`;
    }

    prompt += `Please assess the medical risk level and provide factors that influenced your decision. Consider the patient's demographics, medical history, symptom severity, and pain characteristics.`;

    return prompt;
  }

  // Build prompt for recommendations
  private buildRecommendationsPrompt(
    riskLevel: string,
    symptoms: ISymptom[],
    painLevel: number,
    followUps: IFollowUp[],
    patientInfo?: IPatient
  ) {
    let prompt = `MEDICAL RECOMMENDATION REQUEST\n\n`;
    prompt += `Based on a ${riskLevel} risk assessment, provide care recommendations for:\n\n`;

    // Patient context
    if (patientInfo) {
      prompt += `PATIENT CONTEXT:\n`;
      prompt += `- ${patientInfo.age} year old ${patientInfo.gender}\n`;
      if (patientInfo.medicalHistory && patientInfo.medicalHistory.length > 0) {
        prompt += `- Medical History: ${patientInfo.medicalHistory.join(
          ", "
        )}\n`;
      }
      if (patientInfo.knownAllergies && patientInfo.knownAllergies.length > 0) {
        prompt += `- Allergies: ${patientInfo.knownAllergies.join(", ")}\n`;
      }
      if (patientInfo.currentMedications) {
        prompt += `- Current Medications: ${patientInfo.currentMedications}\n`;
      }
      prompt += `\n`;
    }

    // Symptoms summary
    const allSymptoms = symptoms.flatMap((s) => s.symptoms).filter(Boolean);
    prompt += `SYMPTOMS: ${allSymptoms.join(", ")}\n`;
    prompt += `PAIN LEVEL: ${painLevel}/10\n`;

    // Pain characteristics
    if (followUps.length > 0) {
      prompt += `PAIN CHARACTERISTICS:\n`;
      followUps.forEach((followUp) => {
        prompt += `- Location: ${followUp.painlocation}, Type: ${followUp.description}\n`;
      });
    }

    prompt += `\nProvide specific, actionable medical recommendations and next steps considering the patient's complete profile.`;

    return prompt;
  }

  // Fallback rule-based assessment
  private fallbackRiskAssessment(symptoms: ISymptom[], painLevel: number) {
    const urgentSymptoms = [
      "Chest Pain",
      "Fever/High Temperature",
      "Severe Headache",
      "Difficulty Breathing",
    ];

    // Extract all symptoms from all symptom groups
    const allSymptoms = symptoms.flatMap((s) => s.symptoms).filter(Boolean);
    const hasUrgentSymptoms = allSymptoms.some((symptom) =>
      urgentSymptoms.includes(symptom)
    );

    if (hasUrgentSymptoms || painLevel >= 8) {
      return {
        level: "high" as const,
        factors: ["Emergency symptoms detected", "High pain level"],
        confidence: 0.8,
        reasoning:
          "Rule-based fallback assessment - urgent symptoms or severe pain",
      };
    } else if (painLevel >= 5) {
      return {
        level: "medium" as const,
        factors: [
          "Moderate pain level",
          `Symptoms reported: ${allSymptoms.join(", ")}`,
        ],
        confidence: 0.7,
        reasoning: "Rule-based fallback assessment - moderate symptoms",
      };
    }

    return {
      level: "low" as const,
      factors: [`Mild symptoms: ${allSymptoms.join(", ")}`, "Low pain level"],
      confidence: 0.6,
      reasoning: "Rule-based fallback assessment - mild symptoms",
    };
  }

  // Fallback recommendations
  private fallbackRecommendations(
    riskLevel: string,
    _symptoms: ISymptom[],
    _painLevel: number
  ) {
    // const allSymptoms = symptoms.flatMap((s) => s.symptoms).filter(Boolean);

    if (riskLevel === "high") {
      return {
        recommendations: [
          "Seek immediate medical attention",
          "Go to emergency department now",
          "Do not delay treatment",
        ],
        nextActions: [
          "Call emergency services if symptoms worsen",
          "Go to nearest emergency department",
          "Have someone accompany you",
        ],
        urgency: "immediate" as const,
        redFlags: ["Call 911 if breathing difficulty or chest pain worsens"],
      };
    } else if (riskLevel === "medium") {
      return {
        recommendations: [
          "Contact healthcare provider within 24 hours",
          "Monitor symptoms closely",
          "Rest and avoid strenuous activities",
        ],
        nextActions: [
          "Schedule urgent care appointment",
          "Keep symptom diary",
          "Return if symptoms worsen",
        ],
        urgency: "soon" as const,
        redFlags: ["Seek immediate care if pain increases significantly"],
      };
    }

    return {
      recommendations: [
        "Monitor symptoms for changes",
        "Rest and stay hydrated",
        "Consider over-the-counter pain relief if appropriate",
      ],
      nextActions: [
        "Schedule routine appointment if symptoms persist",
        "Self-monitor for 24-48 hours",
        "Continue normal activities as tolerated",
      ],
      urgency: "routine" as const,
      redFlags: [],
    };
  }
}
