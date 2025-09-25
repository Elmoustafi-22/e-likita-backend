"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RiskFactorSchema = new mongoose_1.Schema({
    symptom: { type: String, required: true },
    severity: { type: Number, required: true },
    keywords: [{ type: String, required: true }],
    riskScore: { type: Number, required: true },
}, { _id: false });
exports.default = RiskFactorSchema;
//# sourceMappingURL=RiskFactor.js.map