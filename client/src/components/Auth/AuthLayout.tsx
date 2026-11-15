import React from 'react';
import HealthOverviewPreview from './HealthOverviewPreview';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen w-full">
        {/* Left Side */}
        <main className="w-full md:w-1/2 flex flex-col px-margin-mobile md:px-margin-desktop py-12 items-center justify-center relative bg-surface">
          {/* Brand Anchor - Top Left */}
          <div className="absolute top-8 left-margin-mobile md:left-margin-desktop flex items-center gap-2">
            <div className="w-10 h-10 bg-on-surface rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-surface" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-on-surface">MediAI</span>
          </div>

          {children}

        </main>

        {/* Right Side */}
        <HealthOverviewPreview />
      </div>
    </div>
  );
};

export default AuthLayout;
