import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import patientRoutes from './routes/patientRoutes';
import consultationRoutes from './routes/consultationRoutes';

const app = express();

// Connect to database
connectDB();
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://e-likita-frontend-mauve.vercel.app",
      "https://e-likita-frontend-7yigaue6w-mustophas-projects.vercel.app"
    ],
  })
);
app.use(express.urlencoded({ extended: true }));
// Init Middleware
app.use(express.json());


// Define Routes
app.use('/api/patients', patientRoutes);
app.use('/api/consultations', consultationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
