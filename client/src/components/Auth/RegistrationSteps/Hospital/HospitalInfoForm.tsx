import { useFormContext } from "react-hook-form";
import { Building, Hash, Calendar, FileText } from "lucide-react";
import type { RegisterFormForHospital } from "../../../../types/Hospital.interface";

export default function HospitalInfoForm() {

  const { register, formState: { errors } } = useFormContext<RegisterFormForHospital>();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-zinc-950 text-sm font-semibold">Hospital Name</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Apollo Multispeciality Hospital"
            className="bg-white border border-zinc-200 h-12 px-4 pl-11 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
            {...register("hospitalName", { required: "Hospital Name is required" })}
          />
          <Building className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
        </div>
        {errors.hospitalName && <span className="text-red-500 text-xs">{errors.hospitalName.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-950 text-sm font-semibold">Hospital Type</label>
          <div className="relative">
            <select
              className="bg-white border border-zinc-200 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm appearance-none"
              {...register("hospitalType", { required: "Type is required" })}
            >
              <option value="">Select type...</option>
              <option value="multispeciality">Multispeciality</option>
              <option value="general">General</option>
              <option value="clinic">Clinic</option>
              <option value="specialized">Specialized</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="size-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.hospitalType && <span className="text-red-500 text-xs">{errors.hospitalType.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-zinc-950 text-sm font-semibold">Established Year</label>
          <div className="relative">
            <input
              type="number"
              placeholder="2005"
              className="bg-white border border-zinc-200 h-12 px-4 pl-11 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register("establishedYear", { required: "Year is required", valueAsNumber: true })}
            />
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
          </div>
          {errors.establishedYear && <span className="text-red-500 text-xs">{errors.establishedYear.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-zinc-950 text-sm font-semibold">Registration Number</label>
        <div className="relative">
          <input
            type="text"
            placeholder="WB-HOSP-2026-001"
            className="bg-white border border-zinc-200 h-12 px-4 pl-11 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
            {...register("registrationNumber", { required: "Registration Number is required" })}
          />
          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
        </div>
        {errors.registrationNumber && <span className="text-red-500 text-xs">{errors.registrationNumber.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-zinc-950 text-sm font-semibold">Description</label>
        <div className="relative">
          <textarea
            placeholder="Leading multispeciality hospital providing advanced healthcare services."
            rows={4}
            className="bg-white border border-zinc-200 py-3 px-4 pl-11 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400 resize-none"
            {...register("description", { required: "Description is required" })}
          />
          <FileText className="absolute left-4 top-[14px] size-5 text-zinc-400" />
        </div>
        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
      </div>
    </div>
  );
}
