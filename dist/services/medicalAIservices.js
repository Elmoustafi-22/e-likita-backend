"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalAIService = void 0;
const google_1 = require("@ai-sdk/google");
const ai_1 = require("ai");
const zod_1 = require("zod");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Initialize Google AI client
const google = (0, google_1.createGoogleGenerativeAI)({
    apiKey: process.env.GOOGLE_API_KEY,
});
// Define Zod schemas for AI responses
const riskAssessmentSchema = zod_1.z.object({
    level: zod_1.z.enum(["low", "medium", "high"]),
    factors: zod_1.z.array(zod_1.z.string()),
    confidence: zod_1.z.number(),
    reasoning: zod_1.z.string(),
});
const recommendationsSchema = zod_1.z.object({
    recommendations: zod_1.z.array(zod_1.z.string()),
    nextActions: zod_1.z.array(zod_1.z.string()),
    urgency: zod_1.z.enum(["immediate", "soon", "routine"]),
    redFlags: zod_1.z.array(zod_1.z.string()),
});
class MedicalAIService {
    // Generate AI-powered risk assessment
    async generateRiskAssessment(symptoms, painLevel, followUps = [], patientInfo) {
        const prompt = this.buildRiskAssessmentPrompt(symptoms, painLevel, followUps, patientInfo);
        try {
            const { object } = await (0, ai_1.generateObject)({
                model: google("models/gemini-2.5-flash"),
                schema: riskAssessmentSchema,
                system: `You are a medical triage AI assistant. Analyze symptoms and provide risk assessment.
                 Always be conservative - when in doubt, recommend higher care level.`,
                prompt,
                temperature: 0.1,
            });
            return object;
        }
        catch (error) {
            console.error("AI Risk Assessment Error:", error);
            // Fallback to rule-based assessment
            return this.fallbackRiskAssessment(symptoms, painLevel);
        }
    }
    // Generate AI-powered recommendations
    async generateRecommendations(riskLevel, symptoms, painLevel, followUps = [], patientInfo) {
        const prompt = this.buildRecommendationsPrompt(riskLevel, symptoms, painLevel, followUps, patientInfo);
        try {
            const { object } = await (0, ai_1.generateObject)({
                model: google("models/gemini-2.5-flash"), // Using a more powerful model for recommendations
                schema: recommendationsSchema,
                system: `You are a medical triage AI providing care recommendations.
                 Always prioritize patient safety. Be specific and actionable.`,
                prompt,
                temperature: 0.1,
            });
            return object;
        }
        catch (error) {
            console.error("AI Recommendations Error:", error);
            // Fallback to rule-based recommendations
            return this.fallbackRecommendations(riskLevel, symptoms, painLevel);
        }
    }
    // Build detailed prompt for risk assessment
    buildRiskAssessmentPrompt(symptoms, painLevel, followUps, patientInfo) {
        let prompt = `PATIENT MEDICAL ASSESSMENT\n\n`;
        // Add patient demographics if available
        if (patientInfo) {
            prompt += `PATIENT INFORMATION:\n`;
            prompt += `- Age: ${patientInfo.age}\n`;
            prompt += `- Gender: ${patientInfo.gender}\n`;
            if (patientInfo.medicalHistory && patientInfo.medicalHistory.length > 0) {
                prompt += `- Medical History: ${patientInfo.medicalHistory.join(", ")}\n`;
            }
            if (patientInfo.knownAllergies && patientInfo.knownAllergies.length > 0) {
                prompt += `- Known Allergies: ${patientInfo.knownAllergies.join(", ")}\n`;
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
    buildRecommendationsPrompt(riskLevel, symptoms, painLevel, followUps, patientInfo) {
        let prompt = `MEDICAL RECOMMENDATION REQUEST\n\n`;
        prompt += `Based on a ${riskLevel} risk assessment, provide care recommendations for:\n\n`;
        // Patient context
        if (patientInfo) {
            prompt += `PATIENT CONTEXT:\n`;
            prompt += `- ${patientInfo.age} year old ${patientInfo.gender}\n`;
            if (patientInfo.medicalHistory && patientInfo.medicalHistory.length > 0) {
                prompt += `- Medical History: ${patientInfo.medicalHistory.join(", ")}\n`;
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
    fallbackRiskAssessment(symptoms, painLevel) {
        const urgentSymptoms = [
            "Chest Pain",
            "Fever/High Temperature",
            "Severe Headache",
            "Difficulty Breathing",
        ];
        // Extract all symptoms from all symptom groups
        const allSymptoms = symptoms.flatMap((s) => s.symptoms).filter(Boolean);
        const hasUrgentSymptoms = allSymptoms.some((symptom) => urgentSymptoms.includes(symptom));
        if (hasUrgentSymptoms || painLevel >= 8) {
            return {
                level: "high",
                factors: ["Emergency symptoms detected", "High pain level"],
                confidence: 0.8,
                reasoning: "Rule-based fallback assessment - urgent symptoms or severe pain",
            };
        }
        else if (painLevel >= 5) {
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
    fallbackRecommendations(riskLevel, _symptoms, _painLevel) {
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
                urgency: "immediate",
                redFlags: ["Call 911 if breathing difficulty or chest pain worsens"],
            };
        }
        else if (riskLevel === "medium") {
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
                urgency: "soon",
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
exports.MedicalAIService = MedicalAIService;
//# sourceMappingURL=medicalAIservices.js.map