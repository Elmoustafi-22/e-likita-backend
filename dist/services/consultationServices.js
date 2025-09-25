"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConsultation = exports.generateSummary = exports.addFollowUps = exports.addSymptoms = exports.getConsultationById = exports.getAllConsultations = exports.createConsultation = void 0;
const Consultation_1 = __importDefault(require("../models/Consultation"));
const consultationUtils_1 = require("../utils/consultationUtils");
const createConsultation = async (consultationData) => {
    const consultation = await Consultation_1.default.create(consultationData);
    const populatedConsultation = await Consultation_1.default.findById(consultation._id).populate("patient");
    return await (0, consultationUtils_1.enhanceConsultationWithCalculations)(populatedConsultation.toObject());
};
exports.createConsultation = createConsultation;
const getAllConsultations = async () => {
    const consultations = await Consultation_1.default.find().populate("patient");
    return await Promise.all(consultations.map(async (consultation) => await (0, consultationUtils_1.enhanceConsultationWithCalculations)(consultation.toObject())));
};
exports.getAllConsultations = getAllConsultations;
const getConsultationById = async (id) => {
    const consultation = await Consultation_1.default.findById(id).populate("patient");
    if (!consultation) {
        return null;
    }
    return await (0, consultationUtils_1.enhanceConsultationWithCalculations)(consultation.toObject());
};
exports.getConsultationById = getConsultationById;
const addSymptoms = async (id, symptoms) => {
    const consultation = await Consultation_1.default.findByIdAndUpdate(id, { symptoms }, { new: true }).populate("patient");
    if (!consultation) {
        return null;
    }
    return await (0, consultationUtils_1.enhanceConsultationWithCalculations)(consultation.toObject());
};
exports.addSymptoms = addSymptoms;
const addFollowUps = async (id, _followUps) => {
    // Note: You might need to add followUps field back to schema if you want to store them
    // Or handle them differently based on your requirements
    const consultation = await Consultation_1.default.findById(id).populate("patient");
    if (!consultation) {
        return null;
    }
    // Process followUps as needed for calculations but don't store them
    return await (0, consultationUtils_1.enhanceConsultationWithCalculations)(consultation.toObject());
};
exports.addFollowUps = addFollowUps;
const generateSummary = async (id) => {
    const consultation = await Consultation_1.default.findById(id).populate("patient");
    if (!consultation) {
        return null;
    }
    // Return the enhanced consultation with all calculated fields
    return await (0, consultationUtils_1.enhanceConsultationWithCalculations)(consultation.toObject());
};
exports.generateSummary = generateSummary;
const updateConsultation = async (id, consultationData) => {
    // Filter out calculated fields from update data
    const { riskAssessment, recommendations, nextActions, status, consultationDuration, ...updateData } = consultationData;
    const consultation = await Consultation_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
    }).populate("patient");
    if (!consultation) {
        return null;
    }
    return await (0, consultationUtils_1.enhanceConsultationWithCalculations)(consultation.toObject());
};
exports.updateConsultation = updateConsultation;
//# sourceMappingURL=consultationServices.js.map