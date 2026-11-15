import { useFormContext } from "react-hook-form";
import { Bed, Activity, Stethoscope } from "lucide-react";
import type { RegisterFormForHospital } from "../../../../types/Hospital.interface";

export default function BedCapacityForm() {
  const { register, formState: { errors } } = useFormContext<RegisterFormForHospital>();

  return (
    <div className="flex flex-col gap-6">
      
      {/* Total Beds */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Bed className="size-4 text-blue-600" />
          </div>
          <h4 className="font-semibold text-sm text-zinc-950">General Bed Capacity</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-zinc-700 text-xs font-semibold">Total General Beds</label>
            <input
              type="number"
              placeholder="50"
              className="bg-white border border-zinc-200 h-11 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register("bedTotal", { required: "Required", valueAsNumber: true })}
            />
            {errors.bedTotal && <span className="text-red-500 text-[10px]">{errors.bedTotal.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-700 text-xs font-semibold">Currently Available</label>
            <input
              type="number"
              placeholder="10"
              className="bg-white border border-zinc-200 h-11 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register("bedAvailable", { required: "Required", valueAsNumber: true })}
            />
            {errors.bedAvailable && <span className="text-red-500 text-[10px]">{errors.bedAvailable.message}</span>}
          </div>
        </div>
      </div>

      {/* ICU Beds */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-8 rounded-lg bg-red-100 flex items-center justify-center">
            <Activity className="size-4 text-red-600" />
          </div>
          <h4 className="font-semibold text-sm text-zinc-950">ICU Bed Capacity</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-zinc-700 text-xs font-semibold">Total ICU Beds</label>
            <input
              type="number"
              placeholder="8"
              className="bg-white border border-zinc-200 h-11 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register("icuTotal", { required: "Required", valueAsNumber: true })}
            />
            {errors.icuTotal && <span className="text-red-500 text-[10px]">{errors.icuTotal.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-700 text-xs font-semibold">Currently Available</label>
            <input
              type="number"
              placeholder="2"
              className="bg-white border border-zinc-200 h-11 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register("icuAvailable", { required: "Required", valueAsNumber: true })}
            />
            {errors.icuAvailable && <span className="text-red-500 text-[10px]">{errors.icuAvailable.message}</span>}
          </div>
        </div>
      </div>

      {/* Ventilators */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-8 rounded-lg bg-teal-100 flex items-center justify-center">
            <Stethoscope className="size-4 text-teal-600" />
          </div>
          <h4 className="font-semibold text-sm text-zinc-950">Ventilator Capacity</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-zinc-700 text-xs font-semibold">Total Ventilators</label>
            <input
              type="number"
              placeholder="5"
              className="bg-white border border-zinc-200 h-11 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register("ventilatorTotal", { required: "Required", valueAsNumber: true })}
            />
            {errors.ventilatorTotal && <span className="text-red-500 text-[10px]">{errors.ventilatorTotal.message}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-700 text-xs font-semibold">Currently Available</label>
            <input
              type="number"
              placeholder="1"
              className="bg-white border border-zinc-200 h-11 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register("ventilatorAvailable", { required: "Required", valueAsNumber: true })}
            />
            {errors.ventilatorAvailable && <span className="text-red-500 text-[10px]">{errors.ventilatorAvailable.message}</span>}
          </div>
        </div>
      </div>

    </div>
  );
}
