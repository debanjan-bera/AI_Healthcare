import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  useParams
} from "react-router-dom";
import { ChatbotLayout } from "../layout/ChatbotLayout";
import ConversationPage from "../pages/chatbot/Conversation";

import PrivateRoute from "../components/ProtectedRoute";
import { ChatbotPage, HomePage, LoginPage, RegisterPage, PharmacyPage, DashboardPage, AppointmentPage } from "../components/LazyComponents";
import { Suspense } from "react";
import RootLayout from "./RootLayout";
import Loading from "../components/Loading";

const ChatRedirect = () => {
  const { sessionId } = useParams();
  return <Navigate to={`/chat/c/${sessionId}`} replace />;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route path="/login" element={<Suspense fallback={<Loading message="Preparing login..." />}><LoginPage /></Suspense>} />
        <Route path="/" element={<PrivateRoute><Suspense fallback={<Loading message="Entering workspace..." />}><HomePage /></Suspense></PrivateRoute>} />

        <Route path="/chat" element={<PrivateRoute><ChatbotLayout /></PrivateRoute>}>
          <Route index element={<ChatbotPage />} />
          <Route path="c/:sessionId" element={<ConversationPage />} />
          <Route path=":sessionId" element={<ChatRedirect />} />
        </Route>

        <Route path="/register" element={<Suspense fallback={<Loading message="Setting up account..." />}><RegisterPage /></Suspense>} />

        <Route path="/dashboard" element={<PrivateRoute><Suspense fallback={<Loading message="Loading dashboard..." />}><DashboardPage /></Suspense></PrivateRoute>} />

        <Route path="/pharmacy" element={<Suspense fallback={<Loading message="Accessing pharmacy..." />}><PharmacyPage /></Suspense>} />
        <Route path="/appointment" element={<PrivateRoute><Suspense fallback={<Loading message="Opening appointments..." />}><AppointmentPage /></Suspense></PrivateRoute>} />
      </Route>
    </>
  )
);