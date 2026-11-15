import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import authRoutes from './api/routes/auth.routes.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import patientRouter from './api/routes/client.route.js';
import hospitalRoutes from './api/routes/hosipital.routes.js';
import AIAgentRouter from './api/routes/ai.routes.js';
import path from "path";

import chatRouter from './api/routes/chat.routes.js';
dotenv.config();

async function bootstrap() {
  await connectDB();
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        process.env.CLIENT_URL as string,
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use('/api/auth', authRoutes);
  app.use('/api/chat', chatRouter);
  app.use('/api/patient', patientRouter);
  app.use('/api/hospital', hospitalRoutes);
  app.use('/api/ai', AIAgentRouter);

  app.use(
    "/outputs",
    express.static(
      path.join(
        process.cwd(),
        "outputs"
      )
    )
  );

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


}

bootstrap()