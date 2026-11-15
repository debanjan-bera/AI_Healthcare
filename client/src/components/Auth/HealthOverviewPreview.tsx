import React from 'react';

const HealthOverviewPreview: React.FC = () => {
  return (
    <aside className="hidden md:flex w-1/2 bg-mesh-gradient p-margin-desktop relative overflow-hidden items-center justify-center">
      {/* Abstract background shapes */}
      <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-surface-container-lowest/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[5%] left-[5%] w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-lg space-y-gutter">
        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/50 soft-card-shadow">
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          <span className="font-label-sm text-label-sm text-on-surface">AI-powered health insights</span>
        </div>

        {/* Health Overview Card */}
        <div className="bg-white rounded-3xl p-8 soft-card-shadow space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-on-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-surface text-lg">ecg</span>
              </div>
              <h3 className="font-headline-md text-headline-md">Health Overview</h3>
            </div>
            <button className="text-on-surface-variant cursor-pointer border-0 bg-transparent">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-sm">favorite</span>
                <span className="font-label-sm text-label-sm">Heart rate</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-md text-headline-md">72</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">bpm</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-sm">footprint</span>
                <span className="font-label-sm text-label-sm">Steps</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-md text-headline-md">8.2k</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Weekly activity</span>
              <span className="font-label-sm text-label-sm text-primary">+12%</span>
            </div>
            <div className="flex items-end justify-between h-20 gap-2">
              <div className="w-full bg-secondary-container/20 rounded-lg h-[40%]"></div>
              <div className="w-full bg-secondary-container/40 rounded-lg h-[60%]"></div>
              <div className="w-full bg-secondary-container/50 rounded-lg h-[55%]"></div>
              <div className="w-full bg-secondary-container/60 rounded-lg h-[80%]"></div>
              <div className="w-full bg-secondary-container/70 rounded-lg h-[65%]"></div>
              <div className="w-full bg-secondary-container rounded-lg h-[100%] shadow-lg shadow-secondary/20"></div>
              <div className="w-full bg-secondary-container/80 rounded-lg h-[75%]"></div>
            </div>
          </div>
        </div>

        {/* AI Suggestion Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 soft-card-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface">AI suggestion</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Try a 10-min walk to boost your daily score</p>
          </div>
        </div>

        {/* Hero Text */}
        <div className="pt-8 space-y-4">
          <h2 className="font-display text-display leading-tight text-on-surface">Your intelligent companion for better health</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
            Track, understand, and improve your wellbeing with personalized AI insights.
          </p>
        </div>
      </div>

      {/* Footer-like text in right panel */}
      <div className="absolute bottom-8 right-margin-desktop text-right">
        <p className="font-label-sm text-label-sm text-on-surface-variant/60">© 2025 MediAI. HIPAA compliant encryption.</p>
      </div>
    </aside>
  );
};

export default HealthOverviewPreview;
