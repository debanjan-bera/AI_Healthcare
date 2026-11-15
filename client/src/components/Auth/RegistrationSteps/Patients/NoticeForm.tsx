import { Check, Info, ShieldCheck } from 'lucide-react'
import { useFormContext } from 'react-hook-form';
import type { RegisterFormForPateint } from "../../../../types/Patient.interface";

export default function NoticeDisclaimer() {
  const methods =
    useFormContext<RegisterFormForPateint>();

  const {
    setValue,
    watch,
  } = methods;

  const watchDisclaimer = watch("agreedToDisclaimer");
  return (
    <div className="flex flex-col items-center pt-8 pb-4 animate-in fade-in slide-in-from-right-4 duration-500 w-full max-w-[500px] mx-auto">
      <div className="size-[84px] rounded-full bg-[#f0fdf4] flex items-center justify-center mb-6">
        <ShieldCheck className="size-8 text-[#00c950]" strokeWidth={2.5} />
      </div>

      <h1 className="font-bold text-zinc-950 text-[28px] mb-2 text-center tracking-tight">Important Notice</h1>
      <p className="text-zinc-500 text-[14px] text-center mb-8 px-4">
        Please review the following carefully before continuing to use MediAI.
      </p>

      <div className="w-full bg-white border border-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] rounded-[24px] p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="size-4 text-[#00c950]" />
          <span className="text-[#00c950] font-bold text-[11px] tracking-[0.1em] uppercase">DISCLAIMER</span>
        </div>
        <p className="text-[14px] text-zinc-800 leading-relaxed mb-6 font-medium">
          This AI assistant provides informational guidance only and does not replace a licensed healthcare professional. Always consult a qualified doctor for medical advice, diagnosis, or treatment.
        </p>

        <ul className="flex flex-col gap-4">
          {[
            "For informational and educational purposes only",
            "Not a replacement for diagnosis or treatment",
            "In emergencies, call your local emergency services immediately",
            "Your data is encrypted and protected under HIPAA standards"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-[#00c950] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-[13px] text-zinc-600 font-medium leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full bg-zinc-100/70 rounded-2xl p-4 flex gap-3 cursor-pointer select-none" onClick={() => setValue('agreedToDisclaimer', !watchDisclaimer)}>
        <div className={`mt-0.5 size-5 rounded-[6px] border-2 flex items-center justify-center shrink-0 transition-colors ${watchDisclaimer ? 'bg-[#00c950] border-[#00c950]' : 'border-zinc-300 bg-white'}`}>
          {watchDisclaimer && <Check className="size-3.5 text-white" strokeWidth={3} />}
        </div>
        <p className="text-[13px] text-zinc-800 font-semibold leading-snug">
          I understand and agree that MediAI's AI assistant is not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  )
}
