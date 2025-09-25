import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatePatient = [
    check('fullName', 'Full name is required').not().isEmpty(),
    check('age', 'Age is required and must be a number').isNumeric(),
    check('gender', 'Gender is required').isIn(['male', 'female', 'other']),
    check('phone', 'Phone number is required').not().isEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateConsultation = [
    check('patient', 'Patient ID is required').isMongoId(),
    check('symptoms', 'Symptoms are required and must not be empty').isArray({ min: 1 }),
    check('painLevel', 'Pain level is required and must be a number').isNumeric(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
