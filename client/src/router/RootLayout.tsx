// RootLayout.tsx
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { ChatProvider } from "../context/ChatProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <Outlet />
      </ChatProvider>
    </AuthProvider>
  );
};

export default RootLayout;