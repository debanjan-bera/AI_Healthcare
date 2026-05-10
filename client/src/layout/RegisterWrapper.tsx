import React, { type ReactNode } from "react";

interface StepWrapperProps {
    children: ReactNode;
    step: number;
    totalSteps: number;
    nextStep: () => void | Promise<void>;
    prevStep: () => void;
    onSubmit: () => void; // comes from handleSubmit
}
const RegisterWrapper: React.FC<StepWrapperProps> = ({
    children,
    step,
    totalSteps,
    nextStep,
    prevStep,
    onSubmit

}) => {

    return (
        <div className="flex-1 flex flex-col justify-center items-center px-6 lg:px-20 h-screen overflow-y-auto">
            <div className="w-full max-w-md py-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-[#0a0c10] mb-2 tracking-tight">
                        Registration
                    </h1>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                            Step {step} <span className="mx-1">/</span> {totalSteps}
                        </p>
                    </div>
                    
                    <div className="flex gap-2 w-full">
                        {[...Array(totalSteps)].map((_, index) => (
                            <div key={index} className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-[#0066FF] transition-all duration-500 ease-out ${index < step ? 'w-full' : 'w-0'}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[350px]">
                    {children}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-4 mt-10">
                    {step > 1 && (
                        <button 
                            type="button"
                            onClick={prevStep}
                            className="flex-1 px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
                        >
                            Back
                        </button>
                    )}

                    <button 
                        type="button"
                        onClick={step === totalSteps ? onSubmit : nextStep}
                        className="flex-[2] px-6 py-3.5 bg-[#0066FF] text-white font-bold rounded-2xl hover:bg-[#0052cc] shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>{step === totalSteps ? "Complete Registration" : "Continue"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterWrapper;