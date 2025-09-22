import { Schema } from "mongoose";
import { IFollowUp } from "../types";

const FollowUpSchema = new Schema<IFollowUp>({
  painlocation: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

export default FollowUpSchema;
