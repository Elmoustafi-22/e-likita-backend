import { Request, Response } from 'express';
import * as patientService from '../services/patientServices';

export const createPatient = async (req: Request, res: Response) => {
    try {
        const patient = await patientService.createPatient(req.body);
        res.status(201).json(patient);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllPatients = async (req: Request, res: Response) => {
    try {
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPatientById = async (req: Request, res: Response) => {
    try {
        const patient = await patientService.getPatientById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
