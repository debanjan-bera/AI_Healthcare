import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Award, HeartPulse, Activity } from "lucide-react";
import type { RegisterFormForHospital } from "../../../../types/Hospital.interface";

export default function SpecialtiesFacilitiesForm() {
  const { register, control } = useFormContext<RegisterFormForHospital>();

  // Specialties
  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control,
    name: "specialties",
  });

  // Facilities
  const { fields: facFields, append: appendFac, remove: removeFac } = useFieldArray({
    control,
    name: "facilities",
  });

  // Services
  const { fields: servFields, append: appendServ, remove: removeServ } = useFieldArray({
    control,
    name: "services",
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Specialties */}
      <div className="flex flex-col gap-3">
        <label className="text-zinc-950 text-sm font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2"><Award className="size-4 text-[#00c950]" /> Specialties</span>
          <button
            type="button"
            onClick={() => appendSpec({ value: "" })}
            className="flex items-center gap-1 text-xs font-semibold text-[#00c950] hover:text-[#00b045] transition-colors bg-[#00c950]/10 px-2 py-1 rounded-md"
          >
            <Plus className="size-3" /> Add Specialty
          </button>
        </label>
        {specFields.length === 0 && <p className="text-xs text-zinc-500 italic">No specialties added.</p>}
        {specFields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="e.g. Heart Surgery"
              className="bg-white border border-zinc-200 h-10 px-3 rounded-lg w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register(`specialties.${index}.value` as const, { required: true })}
            />
            <button
              type="button"
              onClick={() => removeSpec(index)}
              className="size-10 shrink-0 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-zinc-200" />

      {/* Facilities */}
      <div className="flex flex-col gap-3">
        <label className="text-zinc-950 text-sm font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2"><Activity className="size-4 text-[#00c950]" /> Facilities</span>
          <button
            type="button"
            onClick={() => appendFac({ value: "" })}
            className="flex items-center gap-1 text-xs font-semibold text-[#00c950] hover:text-[#00b045] transition-colors bg-[#00c950]/10 px-2 py-1 rounded-md"
          >
            <Plus className="size-3" /> Add Facility
          </button>
        </label>
        {facFields.length === 0 && <p className="text-xs text-zinc-500 italic">No facilities added.</p>}
        {facFields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="e.g. ICU, MRI"
              className="bg-white border border-zinc-200 h-10 px-3 rounded-lg w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register(`facilities.${index}.value` as const, { required: true })}
            />
            <button
              type="button"
              onClick={() => removeFac(index)}
              className="size-10 shrink-0 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-zinc-200" />

      {/* Services */}
      <div className="flex flex-col gap-3">
        <label className="text-zinc-950 text-sm font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2"><HeartPulse className="size-4 text-[#00c950]" /> Services</span>
          <button
            type="button"
            onClick={() => appendServ({ value: "" })}
            className="flex items-center gap-1 text-xs font-semibold text-[#00c950] hover:text-[#00b045] transition-colors bg-[#00c950]/10 px-2 py-1 rounded-md"
          >
            <Plus className="size-3" /> Add Service
          </button>
        </label>
        {servFields.length === 0 && <p className="text-xs text-zinc-500 italic">No services added.</p>}
        {servFields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="e.g. Emergency Care, Online Consultation"
              className="bg-white border border-zinc-200 h-10 px-3 rounded-lg w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
              {...register(`services.${index}.value` as const, { required: true })}
            />
            <button
              type="button"
              onClick={() => removeServ(index)}
              className="size-10 shrink-0 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
