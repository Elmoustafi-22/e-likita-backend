import { Router } from 'express';
import * as patientController from '../controllers/patientController';
import { validatePatient } from '../middlewares/validationMiddleware';

const router = Router();

router.post('/', validatePatient, patientController.createPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);

export default router;
