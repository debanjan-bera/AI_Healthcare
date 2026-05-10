import express,{Request,Response} from 'express';
import { loginController, logoutController, me, registerController } from '../controllers/auth.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const authRoutes = express.Router();

authRoutes.post('/login', loginController );
authRoutes.post('/register', registerController );
authRoutes.get("/me", authMiddleware, me)
authRoutes.post("/logout", logoutController);
export default authRoutes;