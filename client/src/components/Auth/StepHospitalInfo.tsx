import React from "react";
import { useFormContext } from "react-hook-form";
import { Building2, ShieldCheck, ClipboardList } from "lucide-react";
import type { RegisterForm } from "../../types/Auth.interface";

const StepHospitalInfo: React.FC = () => {
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
                    <Building2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Hospital Details</h3>
                <p className="text-sm text-gray-500">Provide registration and type information</p>
            </div>

            {/* Hospital Name */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Building2 size={16} className="text-blue-500" />
                    Hospital Name
                </label>
                <input
                    type="text"
                    placeholder="e.g. Apollo Hospital"
                    {...register("hospitalName", { required: "Hospital Name is required" })}
                    className={inputClasses}
                />
                {errors.hospitalName && (
                    <p className="text-red-500 text-xs font-medium">
                        {errors.hospitalName.message as string}
                    </p>
                )}
            </div>

            {/* Hospital Type */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <ClipboardList size={16} className="text-blue-500" />
                    Hospital Type
                </label>
                <select
                    {...register("hospitalType", { required: "Hospital Type is required" })}
                    className={inputClasses}
                >
                    <option value="">Select Type</option>
                    <option value="Private">Private</option>
                    <option value="Government">Government</option>
                    <option value="Semi-Government">Semi-Government</option>
                    <option value="Trust">Trust</option>
                </select>
                {errors.hospitalType && (
                    <p className="text-red-500 text-xs font-medium">
                        {errors.hospitalType.message as string}
                    </p>
                )}
            </div>

            {/* License Number */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-500" />
                    Medical License / Registration No.
                </label>
                <input
                    type="text"
                    placeholder="e.g. HSP-77889900"
                    {...register("licenseNumber", { required: "License Number is required" })}
                    className={inputClasses}
                />
                {errors.licenseNumber && (
                    <p className="text-red-500 text-xs font-medium">
                        {errors.licenseNumber.message as string}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StepHospitalInfo;
