import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";


import PrivateRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import { HomePage, LoginPage } from "../components/LazyComponents";
import { Suspense } from "react";
import RootLayout from "./RootLayout";
import Register from "../pages/Auth/Register";
import OnBoarding from "../pages/Auth/Onboarding";
import HospitalOnboarding from "../pages/Auth/HospitalOnboarding";



import RoleSelectionPage from "../pages/Auth/RoleSelectionPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Suspense fallback={<div>Loading...</div>}><Register /></Suspense></PublicRoute>} />
        <Route path="/register/onboarding" element={<PrivateRoute><Suspense fallback={<div>Loading...</div>}><RoleSelectionPage /></Suspense></PrivateRoute>} />
        <Route path="/register/onboarding/patient" element={<Suspense fallback={<div>Loading...</div>}><OnBoarding /></Suspense>} />
        <Route path="/register/onboarding/hospital" element={<Suspense fallback={<div>Loading...</div>}><HospitalOnboarding /></Suspense>} />

        {/* Home Redirect (Entering Workspace) */}
        <Route path="/" element={<PrivateRoute><Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense></PrivateRoute>} />


      </Route>
    </>
  )
);