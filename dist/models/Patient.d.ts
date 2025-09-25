import mongoose from "mongoose";
import { IPatient } from "../types";
declare const Patient: mongoose.Model<IPatient, {}, {}, {}, mongoose.Document<unknown, {}, IPatient, {}, {}> & IPatient & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default Patient;
//# sourceMappingURL=Patient.d.ts.map