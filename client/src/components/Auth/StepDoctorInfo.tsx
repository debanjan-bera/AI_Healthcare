import React from "react";
import { useFormContext } from "react-hook-form";
import { Stethoscope, ShieldCheck, Award } from "lucide-react";
import type { RegisterForm } from "../../types/Auth.interface";

const StepDoctorInfo: React.FC = () => {
    const {
        register,
        formState: { errors }
    } = useFormContext<RegisterForm>();

    const inputClasses =
        "w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all";

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-2">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Stethoscope size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Professional Profile</h3>
                <p className="text-sm text-gray-500">Provide your medical credentials</p>
            </div>

            {/* Specialization */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Award size={16} className="text-blue-500" />
                    Specialization
                </label>
                <input
                    type="text"
                    placeholder="e.g. Cardiologist, General Physician"
                    {...register("specialization", { required: "Specialization is required" })}
                    className={inputClasses}
                />
                {errors.specialization && (
                    <p className="text-red-500 text-xs font-medium">
                        {errors.specialization.message as string}
                    </p>
                )}
            </div>

            {/* License Number */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-500" />
                    Medical Registration Number (MCI/NMC)
                </label>
                <input
                    type="text"
                    placeholder="e.g. MCI-12345"
                    {...register("licenseNumber", { required: "Registration Number is required" })}
                    className={inputClasses}
                />
                {errors.licenseNumber && (
                    <p className="text-red-500 text-xs font-medium">
                        {errors.licenseNumber.message as string}
                    </p>
                )}
            </div>

            {/* Experience */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Stethoscope size={16} className="text-blue-500" />
                    Years of Experience
                </label>
                <input
                    type="number"
                    placeholder="e.g. 10"
                    {...register("experience", { required: "Experience is required" })}
                    className={inputClasses}
                />
                {errors.experience && (
                    <p className="text-red-500 text-xs font-medium">
                        {errors.experience.message as string}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StepDoctorInfo;
