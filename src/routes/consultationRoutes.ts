import { Router } from 'express';
import * as consultationController from '../controllers/consultationController';
import { validateConsultation } from '../middlewares/validationMiddleware';

const router = Router();

router.post('/', validateConsultation, consultationController.createConsultation);
router.get('/', consultationController.getAllConsultations);
router.get('/:id', consultationController.getConsultationById);
router.put('/:id', consultationController.updateConsultation);

// New routes for the consultation flow
router.post('/:id/symptoms', consultationController.addSymptomsToConsultation);
router.post('/:id/follow-ups', consultationController.addFollowUpsToConsultation);
router.get('/:id/summary', consultationController.getConsultationSummary);

export default router;
