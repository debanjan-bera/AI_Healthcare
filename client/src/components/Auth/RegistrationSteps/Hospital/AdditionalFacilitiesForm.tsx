import { useFormContext } from "react-hook-form";
import { Pill, Droplet } from "lucide-react";
import type { RegisterFormForHospital } from "../../../../types/Hospital.interface";

export default function AdditionalFacilitiesForm() {
  const { register } = useFormContext<RegisterFormForHospital>();

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="size-11 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
            <Pill className="size-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-semibold text-zinc-950 text-sm">In-house Pharmacy</h4>
            <p className="text-zinc-500 text-xs mt-0.5">Does the hospital have an operational 24x7 pharmacy on campus?</p>
          </div>
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-14 sm:ml-0">
          <input type="checkbox" className="sr-only peer" {...register("pharmacyAvailable")} />
          <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00c950]"></div>
        </label>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="size-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <Droplet className="size-5 text-red-500" />
          </div>
          <div>
            <h4 className="font-semibold text-zinc-950 text-sm">Blood Bank</h4>
            <p className="text-zinc-500 text-xs mt-0.5">Is a registered blood bank facility available within the hospital?</p>
          </div>
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-14 sm:ml-0">
          <input type="checkbox" className="sr-only peer" {...register("bloodBankAvailable")} />
          <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00c950]"></div>
        </label>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
        <div className="mt-0.5 size-5 shrink-0 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">i</div>
        <p className="text-sm text-blue-900 leading-relaxed">
          Almost done! Completing these details helps our AI match patients with the most suitable medical facilities quickly and accurately.
        </p>
      </div>
    </div>
  );
}
