import { Info } from 'lucide-react'
import { useFormContext } from 'react-hook-form';
import type { RegisterFormForPateint } from "../../../../types/Patient.interface";


export default function PhysicalProfile() {
  const methods =
    useFormContext<RegisterFormForPateint>();

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const watchHeightUnit = watch("heightUnit");
  const watchWeightUnit = watch("weightUnit");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <label className="text-zinc-950 text-sm font-semibold">Height <span className="text-red-500">*</span></label>
          <div className="flex bg-zinc-100 rounded-lg p-0.5 border border-zinc-200/50">
            <button
              type="button"
              onClick={() => setValue('heightUnit', 'cm')}
              className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all ${watchHeightUnit === 'cm' ? 'bg-white shadow-sm text-zinc-950' : 'text-zinc-500 hover:text-zinc-700'
                }`}
            >
              cm
            </button>
            <button
              type="button"
              onClick={() => setValue('heightUnit', 'in')}
              className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all ${watchHeightUnit === 'in' ? 'bg-white shadow-sm text-zinc-950' : 'text-zinc-500 hover:text-zinc-700'
                }`}
            >
              ft/in
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Enter height"
          className="bg-zinc-50 border-0 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] outline-none transition-all text-sm placeholder:text-zinc-400"
          {...register("height", { required: "Required" })}
        />
        {errors.height && <p className="text-red-500 text-xs font-medium">{errors.height.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <label className="text-zinc-950 text-sm font-semibold">Weight <span className="text-red-500">*</span></label>
          <div className="flex bg-zinc-100 rounded-lg p-0.5 border border-zinc-200/50">
            <button
              type="button"
              onClick={() => setValue('weightUnit', 'kg')}
              className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all ${watchWeightUnit === 'kg' ? 'bg-white shadow-sm text-zinc-950' : 'text-zinc-500 hover:text-zinc-700'
                }`}
            >
              kg
            </button>
            <button
              type="button"
              onClick={() => setValue('weightUnit', 'lb')}
              className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all ${watchWeightUnit === 'lb' ? 'bg-white shadow-sm text-zinc-950' : 'text-zinc-500 hover:text-zinc-700'
                }`}
            >
              lb
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Enter weight"
          className="bg-zinc-50 border-0 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] outline-none transition-all text-sm placeholder:text-zinc-400"
          {...register("weight", { required: "Required" })}
        />
        {errors.weight && <p className="text-red-500 text-xs font-medium">{errors.weight.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <label className="text-zinc-950 text-sm font-semibold">Blood Group <span className="text-red-500">*</span></label>
        <select
          className="bg-zinc-50 border-0 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] outline-none transition-all text-sm text-zinc-700"
          {...register("bloodGroup", { required: "Required" })}
        >
          <option value="" disabled>Select Blood Group</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg: string) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        {errors.bloodGroup && <p className="text-red-500 text-xs font-medium">{errors.bloodGroup.message}</p>}
      </div>

      <div className="bg-zinc-50/80 rounded-2xl p-4 flex gap-3 mt-4 border border-zinc-100">
        <div className="size-6 rounded-full bg-[#00c950]/10 flex items-center justify-center shrink-0">
          <Info className="size-3.5 text-[#00c950]" />
        </div>
        <div className="flex flex-col gap-1.5 pt-0.5">
          <h4 className="text-sm font-semibold text-zinc-900">Why we need this?</h4>
          <ul className="text-[13px] text-zinc-600 space-y-1.5 list-disc pl-4 marker:text-zinc-400">
            <li>BMI calculation for general health context.</li>
            <li>Medication dosage safety references.</li>
            <li>Obesity-related risk assessment and tracking.</li>
            <li>Personalized nutrition and calorie recommendations.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
