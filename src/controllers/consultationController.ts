import { Request, Response } from 'express';
import * as consultationService from '../services/consultationServices';

export const createConsultation = async (req: Request, res: Response) => {
    try {
        const consultation = await consultationService.createConsultation(req.body);
        res.status(201).json(consultation);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllConsultations = async (_req: Request, res: Response) => {
    try {
        const consultations = await consultationService.getAllConsultations();
        res.status(200).json(consultations);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getConsultationById = async (req: Request, res: Response) => {
    try {
        const consultation = await consultationService.getConsultationById(req.params.id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(consultation);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const addSymptomsToConsultation = async (req: Request, res: Response) => {
    try {
        const consultation = await consultationService.addSymptoms(req.params.id, req.body.symptoms);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(consultation);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const addFollowUpsToConsultation = async (req: Request, res: Response) => {
    try {
        const consultation = await consultationService.addFollowUps(req.params.id, req.body.followUps);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(consultation);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const getConsultationSummary = async (req: Request, res: Response) => {
    try {
        const summary = await consultationService.generateSummary(req.params.id);
        if (!summary) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(summary);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateConsultation = async (req: Request, res: Response) => {
    try {
        const consultation = await consultationService.updateConsultation(req.params.id, req.body);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(consultation);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};