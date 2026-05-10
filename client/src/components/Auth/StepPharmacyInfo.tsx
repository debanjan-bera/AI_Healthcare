import React from "react";
import { useFormContext } from "react-hook-form";
import { Pill, ShieldCheck, Truck } from "lucide-react";
import type { RegisterForm } from "../../types/Auth.interface";

const StepPharmacyInfo: React.FC = () => {
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
                    <Pill size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Pharmacy Details</h3>
                <p className="text-sm text-gray-500">Provide your pharmacy's legal information</p>
            </div>

            {/* Pharmacy Name */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Pill size={16} className="text-blue-500" />
                    Pharmacy Name
                </label>
                <input
                    type="text"
                    placeholder="e.g. LifeCare Pharmacy"
                    {...register("pharmacyName", { required: "Pharmacy Name is required" })}
                    className={inputClasses}
                />
                {errors.pharmacyName && (
                    <p className="text-red-500 text-xs font-medium">
                        {errors.pharmacyName.message as string}
                    </p>
                )}
            </div>

            {/* Drug License Number */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-500" />
                    Drug License Number
                </label>
                <input
                    type="text"
                    placeholder="e.g. DL-12345678"
                    {...register("licenseNumber", { required: "License Number is required" })}
                    className={inputClasses}
                />
                {errors.licenseNumber && (
                    <p className="text-red-500 text-xs font-medium">
                        {errors.licenseNumber.message as string}
                    </p>
                )}
            </div>

            {/* Delivery Available */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-100">
                        <Truck size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Home Delivery</h4>
                        <p className="text-xs text-gray-500">Do you offer delivery services?</p>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        {...register("deliveryAvailable")} 
                        className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>
    );
};

export default StepPharmacyInfo;
