import React from "react";
import { useFormContext } from "react-hook-form";
import { Activity, ClipboardList, Pill } from "lucide-react";

// Extend your global form type if needed
type RegisterForm = {
  allergies?: string;
  medicalHistory?: string;
  currentMedicines?: string;
};

const StepMedical: React.FC = () => {
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
          <Activity size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Medical Background</h3>
        <p className="text-sm text-gray-500">This helps our AI assistant provide better care</p>
      </div>

      {/* Allergies */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <ClipboardList size={16} className="text-blue-500" />
          Allergies
        </label>
        <input
          type="text"
          placeholder="e.g. Peanuts, Penicillin (comma separated)"
          {...register("allergies")}
          className={inputClasses}
        />
        {errors.allergies && (
          <p className="text-red-500 text-xs font-medium">
            {errors.allergies.message as string}
          </p>
        )}
      </div>

      {/* Medical History */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Activity size={16} className="text-blue-500" />
          Medical History
        </label>
        <textarea
          rows={3}
          placeholder="Past surgeries, chronic conditions, etc."
          {...register("medicalHistory")}
          className={`${inputClasses} resize-none`}
        />
        {errors.medicalHistory && (
          <p className="text-red-500 text-xs font-medium">
            {errors.medicalHistory.message as string}
          </p>
        )}
      </div>

      {/* Current Medicines */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Pill size={16} className="text-blue-500" />
          Current Medicines
        </label>
        <textarea
          rows={3}
          placeholder="Any medications you are taking now..."
          {...register("currentMedicines")}
          className={`${inputClasses} resize-none`}
        />
        {errors.currentMedicines && (
          <p className="text-red-500 text-xs font-medium">
            {errors.currentMedicines.message as string}
          </p>
        )}
      </div>

    </div>
  );
};

export default StepMedical;