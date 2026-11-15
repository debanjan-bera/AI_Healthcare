import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/login', AuthController.loginController );
authRoutes.post('/register', AuthController.registerController );

authRoutes.get("/me", authMiddleware , AuthController.me);
authRoutes.post("/logout", AuthController.logoutController);


export default authRoutes;