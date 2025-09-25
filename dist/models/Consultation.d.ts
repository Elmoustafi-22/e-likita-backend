import mongoose from "mongoose";
import { IConsultation } from "../types";
declare const Consultation: mongoose.Model<IConsultation, {}, {}, {}, mongoose.Document<unknown, {}, IConsultation, {}, {}> & IConsultation & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default Consultation;
//# sourceMappingURL=Consultation.d.ts.map