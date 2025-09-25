"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.updatePatient = exports.getPatientById = exports.getAllPatients = exports.createPatient = void 0;
const Patient_1 = __importDefault(require("../models/Patient"));
const createPatient = async (patientData) => {
    return await Patient_1.default.create(patientData);
};
exports.createPatient = createPatient;
const getAllPatients = async () => {
    return await Patient_1.default.find();
};
exports.getAllPatients = getAllPatients;
const getPatientById = async (id) => {
    return await Patient_1.default.findById(id);
};
exports.getPatientById = getPatientById;
const updatePatient = async (id, patientData) => {
    return await Patient_1.default.findByIdAndUpdate(id, patientData, { new: true });
};
exports.updatePatient = updatePatient;
const deletePatient = async (id) => {
    return await Patient_1.default.findByIdAndDelete(id);
};
exports.deletePatient = deletePatient;
//# sourceMappingURL=patientServices.js.map