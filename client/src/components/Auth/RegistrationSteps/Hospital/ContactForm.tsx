import { useFormContext, useFieldArray } from "react-hook-form";
import { Phone, Mail, Globe, Plus, Trash2, PhoneCall } from "lucide-react";
import type { RegisterFormForHospital } from "../../../../types/Hospital.interface";

export default function ContactForm() {
  const { register, control, formState: { errors } } = useFormContext<RegisterFormForHospital>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-zinc-950 text-sm font-semibold flex items-center justify-between">
          Phone Numbers
          <button
            type="button"
            onClick={() => append({ value: "" })}
            className="flex items-center gap-1 text-xs font-semibold text-[#00c950] hover:text-[#00b045] transition-colors bg-[#00c950]/10 px-2 py-1 rounded-md"
          >
            <Plus className="size-3" /> Add Phone
          </button>
        </label>
        
        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="+919876543210"
                className="bg-white border border-zinc-200 h-12 px-4 pl-11 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
                {...register(`phones.${index}.value` as const, { required: "Phone is required" })}
              />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="size-12 shrink-0 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="size-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <label className="text-zinc-950 text-sm font-semibold">Emergency Phone</label>
        <div className="relative">
          <input
            type="text"
            placeholder="102"
            className="bg-white border border-zinc-200 h-12 px-4 pl-11 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
            {...register("emergencyPhone", { required: "Emergency Phone is required" })}
          />
          <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
        </div>
        {errors.emergencyPhone && <span className="text-red-500 text-xs">{errors.emergencyPhone.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-zinc-950 text-sm font-semibold">Email Address</label>
        <div className="relative">
          <input
            type="email"
            placeholder="contact@apollohospital.com"
            className="bg-white border border-zinc-200 h-12 px-4 pl-11 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
            {...register("email", { 
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
            })}
          />
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
        </div>
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-zinc-950 text-sm font-semibold">Website (Optional)</label>
        <div className="relative">
          <input
            type="url"
            placeholder="https://apollohospital.com"
            className="bg-white border border-zinc-200 h-12 px-4 pl-11 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
            {...register("website")}
          />
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
        </div>
      </div>
    </div>
  );
}
