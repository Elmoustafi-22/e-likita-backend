"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConsultation = exports.getConsultationSummary = exports.addFollowUpsToConsultation = exports.addSymptomsToConsultation = exports.getConsultationById = exports.getAllConsultations = exports.createConsultation = void 0;
const consultationService = __importStar(require("../services/consultationServices"));
const createConsultation = async (req, res) => {
    try {
        const consultation = await consultationService.createConsultation(req.body);
        res.status(201).json(consultation);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createConsultation = createConsultation;
const getAllConsultations = async (_req, res) => {
    try {
        const consultations = await consultationService.getAllConsultations();
        res.status(200).json(consultations);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllConsultations = getAllConsultations;
const getConsultationById = async (req, res) => {
    try {
        const consultation = await consultationService.getConsultationById(req.params.id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(consultation);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getConsultationById = getConsultationById;
const addSymptomsToConsultation = async (req, res) => {
    try {
        const consultation = await consultationService.addSymptoms(req.params.id, req.body.symptoms);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(consultation);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.addSymptomsToConsultation = addSymptomsToConsultation;
const addFollowUpsToConsultation = async (req, res) => {
    try {
        const consultation = await consultationService.addFollowUps(req.params.id, req.body.followUps);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(consultation);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.addFollowUpsToConsultation = addFollowUpsToConsultation;
const getConsultationSummary = async (req, res) => {
    try {
        const summary = await consultationService.generateSummary(req.params.id);
        if (!summary) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(summary);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getConsultationSummary = getConsultationSummary;
const updateConsultation = async (req, res) => {
    try {
        const consultation = await consultationService.updateConsultation(req.params.id, req.body);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(consultation);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.updateConsultation = updateConsultation;
//# sourceMappingURL=consultationController.js.map