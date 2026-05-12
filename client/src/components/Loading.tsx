import React from 'react';
import { HeartPulse } from 'lucide-react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = true
}) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
    : "flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px]";

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Animated Rings */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping scale-150"></div>
        <div className="absolute inset-0 rounded-full bg-blue-400/10 animate-ping delay-300 scale-200"></div>

        {/* Main Logo Container */}
        <div className="relative bg-[#0066FF] p-5 rounded-2xl shadow-xl shadow-blue-500/30 animate-bounce">
          <HeartPulse className="text-white w-10 h-10" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
        </div>
      </div>

      {/* Decorative background elements if full screen */}
      {fullScreen && (
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 animate-pulse delay-700"></div>
        </div>
      )}
    </div>
  );
};

export default Loading;
