import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import authRoutes from './api/routes/auth.routes';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import chatRouter from './api/routes/chat.routes';
import hospitalRouter from './api/routes/hospital.route';
import patientRouter from './api/routes/patient.route';
import pharmacyRouter from './api/routes/pharmacy.route';
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRouter);
app.use('/api/hospital', hospitalRouter);
app.use('/api/patient', patientRouter);
app.use('/api/pharmacy', pharmacyRouter);

app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.message);
  res.status(500).json({ error: 'Something went wrong!' });
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});