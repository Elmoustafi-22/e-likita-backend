"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const consultationRoutes_1 = __importDefault(require("./routes/consultationRoutes"));
const app = (0, express_1.default)();
// Connect to database
(0, database_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use(express_1.default.urlencoded({ extended: true }));
// Init Middleware
app.use(express_1.default.json());
// Define Routes
app.use('/api/patients', patientRoutes_1.default);
app.use('/api/consultations', consultationRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//# sourceMappingURL=index.js.map