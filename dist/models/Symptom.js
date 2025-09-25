"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SymptomSchema = new mongoose_1.Schema({
    symptoms: [{ type: String, required: true }],
    duration: { type: String, required: true },
    severity: { type: Number, required: true, min: 0, max: 10 },
    additionalDetails: { type: String },
}, { _id: false });
exports.default = SymptomSchema;
//# sourceMappingURL=Symptom.js.map