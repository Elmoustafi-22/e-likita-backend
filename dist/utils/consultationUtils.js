"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceConsultationWithCalculations = exports.determineConsultationStatus = exports.calculateConsultationDuration = void 0;
const medicalAIservices_1 = require("../services/medicalAIservices");
// Calculate consultation duration
const calculateConsultationDuration = (createdAt) => {
    return Math.round((new Date().getTime() - new Date(createdAt).getTime()) / 1000 / 60);
};
exports.calculateConsultationDuration = calculateConsultationDuration;
// Determine consultation status
const determineConsultationStatus = (consultation) => {
    const hoursSinceCreation = (new Date().getTime() - new Date(consultation.createdAt).getTime()) /
        (1000 * 60 * 60);
    return hoursSinceCreation > 2 ? "completed" : "in-progress";
};
exports.determineConsultationStatus = determineConsultationStatus;
// Main function to enhance consultation with calculated fields
const enhanceConsultationWithCalculations = async (consultation) => {
    const aiService = new medicalAIservices_1.MedicalAIService();
    const symptoms = consultation.symptoms;
    const painLevel = symptoms.reduce((acc, s) => Math.max(acc, s.severity || 0), 0);
    // The followUps field is not in the schema, so we check for it dynamically
    const followUps = consultation.followUps || [];
    const patientInfo = consultation.patient;
    try {
        const riskAssessment = await aiService.generateRiskAssessment(symptoms, painLevel, followUps, 
        // @ts-ignore
        patientInfo);
        const recommendationsResult = await aiService.generateRecommendations(riskAssessment.level, symptoms, painLevel, followUps, 
        // @ts-ignore
        patientInfo);
        const consultationDuration = (0, exports.calculateConsultationDuration)(consultation.createdAt);
        const status = (0, exports.determineConsultationStatus)(consultation);
        return {
            ...consultation,
            riskAssessment,
            recommendations: recommendationsResult.recommendations,
            nextActions: recommendationsResult.nextActions,
            status,
            consultationDuration,
        };
    }
    catch (error) {
        console.error("Error enhancing consultation with AI:", error);
        // Fallback to a simple enhancement if AI fails
        const consultationDuration = (0, exports.calculateConsultationDuration)(consultation.createdAt);
        const status = (0, exports.determineConsultationStatus)(consultation);
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
exports.enhanceConsultationWithCalculations = enhanceConsultationWithCalculations;
//# sourceMappingURL=consultationUtils.js.map