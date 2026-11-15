import { lazy } from "react";

export const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
export const ChatbotPage = lazy(() => import("../pages/chatbot/ChatBotPage"));
export const HomePage = lazy(() => import("../pages/Home"));
export const RegisterPage = lazy(() => import("../pages/Auth/Register"));