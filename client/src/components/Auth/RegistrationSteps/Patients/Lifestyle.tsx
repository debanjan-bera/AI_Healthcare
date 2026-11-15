import { Cigarette, Dumbbell, Sparkles, Wine } from 'lucide-react'
import { useFormContext } from 'react-hook-form';
import type { RegisterFormForPateint } from "../../../../types/Patient.interface";

export default function LifestyleForm() {
    const methods =
        useFormContext<RegisterFormForPateint>();

    const {
        setValue,
        watch,
    } = methods;

    const watchSmoke = watch("smoke");
    const watchAlcohol = watch("alcohol");
    const watchExercise = watch("exercise");
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white border border-zinc-200 rounded-[20px] p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                        <Cigarette className="size-4 text-[#00c950]" />
                    </div>
                    <h4 className="font-semibold text-[15px] text-zinc-900">Do you smoke?</h4>
                </div>
                <div className="flex gap-2">
                    <button type="button" onClick={() => setValue('smoke', true)} className={`h-11 px-8 rounded-xl text-[13px] font-semibold transition-all ${watchSmoke === true ? 'bg-[#00c950] text-white' : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'}`}>Yes</button>
                    <button type="button" onClick={() => setValue('smoke', false)} className={`h-11 px-8 rounded-xl text-[13px] font-semibold transition-all ${watchSmoke === false ? 'bg-[#00c950] text-white' : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'}`}>No</button>
                </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[20px] p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                        <Wine className="size-4 text-[#00c950]" />
                    </div>
                    <h4 className="font-semibold text-[15px] text-zinc-900">Do you consume alcohol?</h4>
                </div>
                <div className="flex gap-2">
                    <button type="button" onClick={() => setValue('alcohol', true)} className={`h-11 px-8 rounded-xl text-[13px] font-semibold transition-all ${watchAlcohol ? 'bg-[#00c950] text-white' : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'}`}>Yes</button>
                    <button type="button" onClick={() => setValue('alcohol', false)} className={`h-11 px-8 rounded-xl text-[13px] font-semibold transition-all ${!watchAlcohol ? 'bg-[#00c950] text-white' : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'}`}>No</button>
                </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[20px] p-5 shadow-sm mb-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                        <Dumbbell className="size-4 text-[#00c950]" />
                    </div>
                    <h4 className="font-semibold text-[15px] text-zinc-900">How often do you exercise?</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['Daily', 'Weekly', 'Occasionally', 'Rarely'].map(opt => (
                        <button key={opt} type="button" onClick={() => setValue('exercise', opt as any)} className={`h-11 px-5 rounded-xl text-[13px] font-semibold transition-all ${watchExercise === opt ? 'bg-[#00c950] text-white' : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'}`}>
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-2 mb-2">
                <Sparkles className="size-4 text-[#00c950]" />
                <span className="text-[13px] text-zinc-500 font-medium">You're all set! Tap Continue to finish setting up your profile.</span>
            </div>
        </div>
    )
}
