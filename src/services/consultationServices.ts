import Consultation from "../models/Consultation";
import { IConsultation, ISymptom, IFollowUp } from "../types";

// A placeholder function to simulate risk assessment logic
const calculateRiskAssessment = (symptoms: ISymptom[], followUps: IFollowUp[]) => {
    // In a real application, this function would contain complex logic
    // to assess risk based on the provided symptoms and follow-up answers.
    // For now, we'll use a simple placeholder logic.
    const hasSevereHeadache = symptoms.some(s => s.symptoms.includes("Severe Headache"));
    const painSeverity = symptoms.reduce((acc, s) => Math.max(acc, s.severity), 0);

    if (hasSevereHeadache && painSeverity > 7) {
        return {
            level: "high" as "high",
            factors: ["Severe headache reported", "High pain level"]
        };
    }
    return {
        level: "low" as "low",
        factors: ["No major risk factors identified"]
    };
};

// A placeholder function to generate recommendations
const generateRecommendations = (riskAssessment: { level: string, factors: string[] }) => {
    if (riskAssessment.level === "high") {
        return {
            recommendations: ["Seek immediate medical attention at the emergency department", "Do not delay - call emergency services if symptoms worsen"],
            nextActions: ["Visit Emergency Department immediately", "Call emergency services: 911"]
        };
    }
    return {
        recommendations: ["Monitor your symptoms", "Rest and drink plenty of fluids"],
        nextActions: ["Schedule a follow-up appointment if symptoms persist"]
    };
};

export const createConsultation = async (consultationData: Omit<IConsultation, '_id'>): Promise<IConsultation> => {
    return await Consultation.create(consultationData);
};

export const getAllConsultations = async (): Promise<IConsultation[]> => {
    return await Consultation.find().populate('patient');
};

export const getConsultationById = async (id: string): Promise<IConsultation | null> => {
    return await Consultation.findById(id).populate('patient');
};

export const addSymptoms = async (id: string, symptoms: ISymptom[]): Promise<IConsultation | null> => {
    return await Consultation.findByIdAndUpdate(id, { symptoms }, { new: true }).populate('patient');
};

export const addFollowUps = async (id: string, followUps: IFollowUp[]): Promise<IConsultation | null> => {
    return await Consultation.findByIdAndUpdate(id, { followUps }, { new: true }).populate('patient');
};

export const generateSummary = async (id: string): Promise<IConsultation | null> => {
    const consultation = await Consultation.findById(id);
    if (!consultation) {
        return null;
    }

    const riskAssessment = calculateRiskAssessment(consultation.symptoms, consultation.followUps);
    const { recommendations, nextActions } = generateRecommendations(riskAssessment);

    const consultationDuration = Math.round((new Date().getTime() - new Date(consultation.createdAt!).getTime()) / 1000 / 60);

    consultation.riskAssessment = riskAssessment;
    consultation.recommendations = recommendations;
    consultation.nextActions = nextActions;
    consultation.consultationDuration = consultationDuration;
    consultation.status = "completed";

    await consultation.save();
    return await Consultation.findById(id).populate('patient');
};

export const updateConsultation = async (id: string, consultationData: Partial<IConsultation>): Promise<IConsultation | null> => {
    return await Consultation.findByIdAndUpdate(id, consultationData, { new: true }).populate('patient');
};

export const deleteConsultation = async (id: string): Promise<IConsultation | null> => {
    return await Consultation.findByIdAndDelete(id);
};