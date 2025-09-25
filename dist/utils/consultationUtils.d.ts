import { IConsultation, IConsultationResponse } from "../types";
export declare const calculateConsultationDuration: (createdAt: Date) => number;
export declare const determineConsultationStatus: (consultation: IConsultation) => "in-progress" | "completed";
export declare const enhanceConsultationWithCalculations: (consultation: IConsultation) => Promise<IConsultationResponse>;
//# sourceMappingURL=consultationUtils.d.ts.map