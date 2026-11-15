import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";



import { Suspense } from "react";

// import VoiceAssistant from "../pages/LiveKit";
import { PipecatProvider } from "@/pages/Pipecat";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        {/* Public Routes */}
        {/* <Route path="/login" element={<PublicRoute><Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense></PublicRoute>} /> */}
        <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><PipecatProvider /></Suspense>}/>


      </Route>
    </>
  )
);