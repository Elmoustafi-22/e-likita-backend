"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FollowUpSchema = new mongoose_1.Schema({
    painlocation: { type: String, required: true },
    description: { type: String, required: true },
}, { _id: false });
exports.default = FollowUpSchema;
//# sourceMappingURL=FollowUp.js.map