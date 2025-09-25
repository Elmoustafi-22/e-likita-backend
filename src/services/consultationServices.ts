import Consultation from "../models/Consultation";
import { IConsultation, IConsultationResponse, ISymptom, IFollowUp } from "../types";
import { enhanceConsultationWithCalculations } from '../utils/consultationUtils'


export const createConsultation = async (
  consultationData: Omit<IConsultation, "_id">
): Promise<IConsultationResponse> => {
  const consultation = await Consultation.create(consultationData);
  const populatedConsultation = await Consultation.findById(
    consultation._id
  ).populate("patient");
  return await enhanceConsultationWithCalculations(populatedConsultation!.toObject());
};

export const getAllConsultations = async (): Promise<
  IConsultationResponse[]
> => {
  const consultations = await Consultation.find().populate("patient");
  return await Promise.all(consultations.map(async (consultation) =>
    await enhanceConsultationWithCalculations(consultation.toObject())
  ));
};

export const getConsultationById = async (
  id: string
): Promise<IConsultationResponse | null> => {
  const consultation = await Consultation.findById(id).populate("patient");
  if (!consultation) {
    return null;
  }
  return await enhanceConsultationWithCalculations(consultation.toObject());
};

export const addSymptoms = async (
  id: string,
  symptoms: ISymptom[]
): Promise<IConsultationResponse | null> => {
  const consultation = await Consultation.findByIdAndUpdate(
    id,
    { symptoms },
    { new: true }
  ).populate("patient");

  if (!consultation) {
    return null;
  }
  return await enhanceConsultationWithCalculations(consultation.toObject());
};

export const addFollowUps = async (
  id: string,
  followUps: IFollowUp[]
): Promise<IConsultationResponse | null> => {
  // Note: You might need to add followUps field back to schema if you want to store them
  // Or handle them differently based on your requirements
  const consultation = await Consultation.findById(id).populate("patient");
  if (!consultation) {
    return null;
  }
  // Process followUps as needed for calculations but don't store them
  return await enhanceConsultationWithCalculations(consultation.toObject());
};

export const generateSummary = async (
  id: string
): Promise<IConsultationResponse | null> => {
  const consultation = await Consultation.findById(id).populate("patient");
  if (!consultation) {
    return null;
  }
  // Return the enhanced consultation with all calculated fields
  return await enhanceConsultationWithCalculations(consultation.toObject());
};

export const updateConsultation = async (
  id: string,
  consultationData: Partial<IConsultation>
): Promise<IConsultationResponse | null> => {
  // Filter out calculated fields from update data
  const {
    riskAssessment,
    recommendations,
    nextActions,
    status,
    consultationDuration,
    ...updateData
  } = consultationData as any;

  const consultation = await Consultation.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate("patient");

  if (!consultation) {
    return null;
  }
  return await enhanceConsultationWithCalculations(consultation.toObject());
};