"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConsultation = exports.validatePatient = void 0;
const express_validator_1 = require("express-validator");
exports.validatePatient = [
    (0, express_validator_1.check)('fullName', 'Full name is required').not().isEmpty(),
    (0, express_validator_1.check)('age', 'Age is required and must be a number').isNumeric(),
    (0, express_validator_1.check)('gender', 'Gender is required').isIn(['male', 'female', 'other']),
    (0, express_validator_1.check)('phone', 'Phone number is required').not().isEmpty(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    }
];
exports.validateConsultation = [
    (0, express_validator_1.check)('patient', 'Patient ID is required').isMongoId(),
    (0, express_validator_1.check)('symptoms', 'Symptoms are required and must not be empty').isArray({ min: 1 }),
    (0, express_validator_1.check)('painLevel', 'Pain level is required and must be a number').isNumeric(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    }
];
//# sourceMappingURL=validationMiddleware.js.map