// RootLayout.tsx
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { ThemeProvider } from "../context/ThemeContext";

const RootLayout = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* <ChatProvider> */}
          <Outlet />
        {/* </ChatProvider> */}
      </AuthProvider>
    </ThemeProvider>
  );
};

export default RootLayout;