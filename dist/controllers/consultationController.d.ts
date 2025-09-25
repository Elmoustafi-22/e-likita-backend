import { Request, Response } from 'express';
export declare const createConsultation: (req: Request, res: Response) => Promise<void>;
export declare const getAllConsultations: (_req: Request, res: Response) => Promise<void>;
export declare const getConsultationById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addSymptomsToConsultation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addFollowUpsToConsultation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getConsultationSummary: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateConsultation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=consultationController.d.ts.map