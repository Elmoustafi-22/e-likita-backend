import OpenAI from "openai";
import { ISymptom, IFollowUp, IPatient } from "../types";
import { config } from "dotenv";

config()

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a medical triage AI assistant. Analyze symptoms and provide risk assessment.
            Always be conservative - when in doubt, recommend higher care level.
            Respond ONLY in valid JSON format with this structure:
            {
              "level": "low|medium|high",
              "factors": ["factor1", "factor2"],
              "confidence": 0.85,
              "reasoning": "Brief explanation"
            }`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.1, // Low temperature for consistent medical advice
      });

      const aiResponse = response.choices[0]?.message?.content;
      return this.parseAIResponse(aiResponse);
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
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a medical triage AI providing care recommendations.
            Always prioritize patient safety. Be specific and actionable.
            Respond ONLY in valid JSON format:
            {
              "recommendations": ["recommendation1", "recommendation2"],
              "nextActions": ["action1", "action2"],
              "urgency": "immediate|soon|routine",
              "redFlags": ["warning1", "warning2"]
            }`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 400,
        temperature: 0.1,
      });

      const aiResponse = response.choices[0]?.message?.content;
      return this.parseRecommendationsResponse(aiResponse);
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

  // Parse AI response with error handling
  private parseAIResponse(response: string | null) {
    try {
      if (!response) throw new Error("No AI response");

      const parsed = JSON.parse(response);
      return {
        level: parsed.level || "medium",
        factors: parsed.factors || ["AI assessment completed"],
        confidence: parsed.confidence || 0.5,
        reasoning: parsed.reasoning || "AI-generated assessment",
      };
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      return {
        level: "medium",
        factors: ["Unable to complete AI assessment"],
        confidence: 0.3,
        reasoning: "Fallback assessment due to parsing error",
      };
    }
  }

  // Parse recommendations response
  private parseRecommendationsResponse(response: string | null) {
    try {
      if (!response) throw new Error("No AI response");

      const parsed = JSON.parse(response);
      return {
        recommendations: parsed.recommendations || [
          "Consult with healthcare provider",
        ],
        nextActions: parsed.nextActions || ["Schedule medical appointment"],
        urgency: parsed.urgency || "routine",
        redFlags: parsed.redFlags || [],
      };
    } catch (error) {
      console.error("Failed to parse recommendations response:", error);
      return {
        recommendations: ["Consult with healthcare provider"],
        nextActions: ["Schedule medical appointment"],
        urgency: "routine",
        redFlags: [],
      };
    }
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
        level: "high",
        factors: ["Emergency symptoms detected", "High pain level"],
        confidence: 0.8,
        reasoning:
          "Rule-based fallback assessment - urgent symptoms or severe pain",
      };
    } else if (painLevel >= 5) {
      return {
        level: "medium",
        factors: [
          "Moderate pain level",
          `Symptoms reported: ${allSymptoms.join(", ")}`,
        ],
        confidence: 0.7,
        reasoning: "Rule-based fallback assessment - moderate symptoms",
      };
    }

    return {
      level: "low",
      factors: [`Mild symptoms: ${allSymptoms.join(", ")}`, "Low pain level"],
      confidence: 0.6,
      reasoning: "Rule-based fallback assessment - mild symptoms",
    };
  }

  // Fallback recommendations
  private fallbackRecommendations(
    riskLevel: string,
    symptoms: ISymptom[],
    painLevel: number
  ) {
    const allSymptoms = symptoms.flatMap((s) => s.symptoms).filter(Boolean);

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
        urgency: "immediate",
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
        urgency: "urgent",
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
      urgency: "routine",
      redFlags: [],
    };
  }
}
