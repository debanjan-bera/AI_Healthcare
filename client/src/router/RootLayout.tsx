// RootLayout.tsx
import { Outlet } from "react-router-dom";

import { ThemeProvider } from "../context/ThemeContext";

const RootLayout = () => {
  return (
    <ThemeProvider>

          <Outlet />

    </ThemeProvider>
  );
};

export default RootLayout;