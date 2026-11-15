import { Heart, Phone, ShieldCheck, User } from 'lucide-react'  
import { useFormContext } from 'react-hook-form'
import type { RegisterFormForPateint } from "../../../../types/Patient.interface";

export default function EmerencyContact() {
  const { register } = useFormContext<RegisterFormForPateint>();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-zinc-950 text-[13px] font-semibold">Contact name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Full name"
            className="bg-zinc-50 border-0 h-12 pl-11 pr-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] outline-none transition-all text-sm placeholder:text-zinc-400"
            {...register("emergencyContactName")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-zinc-950 text-[13px] font-semibold">Relationship</label>
        <div className="relative">
          <Heart className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input
            type="text"
            placeholder="e.g. Spouse, Parent, Sibling"
            className="bg-zinc-50 border-0 h-12 pl-11 pr-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] outline-none transition-all text-sm placeholder:text-zinc-400"
            {...register("emergencyRelationship")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-zinc-950 text-[13px] font-semibold">Phone number</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input
            type="tel"
            placeholder="+1 555 000 0000"
            className="bg-zinc-50 border-0 h-12 pl-11 pr-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] outline-none transition-all text-sm placeholder:text-zinc-400"
            {...register("emergencyPhone")}
          />
        </div>
      </div>

      <div className="bg-[#f0fdf4] rounded-xl p-4 flex gap-3 mt-4 border border-[#00c950]/20">
        <ShieldCheck className="size-5 text-[#00c950] shrink-0" />
        <p className="text-[13px] font-medium text-zinc-700 leading-snug">
          This information is kept private and only accessed in case of a medical emergency.
        </p>
      </div>
    </div>
  )
}
