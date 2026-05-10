import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  useParams
} from "react-router-dom";
import { ChatborLayout } from "../layout/ChatborLayout";
import ConversationPage from "../pages/chatbot/Conversation";

import PrivateRoute from "../components/ProtectedRoute";
import { ChatbotPage, HomePage, LoginPage, RegisterPage, PharmacyPage, AdminDashboardPage } from "../components/LazyComponents";
import { Suspense } from "react";
import RootLayout from "./RootLayout";

const ChatRedirect = () => {
  const { sessionId } = useParams();
  return <Navigate to={`/chat/c/${sessionId}`} replace />;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route path="/login" element={<Suspense fallback={<div>Loading page...</div>}><LoginPage /></Suspense>} />
        <Route path="/" element={<PrivateRoute><Suspense fallback={<div>Loading page...</div>}><HomePage /></Suspense></PrivateRoute>} />

        <Route path="/chat" element={<PrivateRoute><ChatborLayout /></PrivateRoute>}>
          <Route index element={<ChatbotPage />} />
          <Route path="c/:sessionId" element={<ConversationPage />} />
          <Route path=":sessionId" element={<ChatRedirect />} />
        </Route>

        <Route path="/register" element={<Suspense fallback={<div>Loading page...</div>}><RegisterPage /></Suspense>} />

        <Route path="/dashboard" element={<Suspense fallback={<div>Loading page...</div>}><AdminDashboardPage /></Suspense>} />

        <Route path="/pharmacy" element={<Suspense fallback={<div>Loading page...</div>}><PharmacyPage /></Suspense>} />
      </Route>
    </>
  )
);