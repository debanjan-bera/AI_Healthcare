import { Activity, Check, Heart, Pill, X } from 'lucide-react';
import { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import type { RegisterFormForPateint } from "../../../../types/Patient.interface";


export default function HealthInfo() {
    const {
        register,
        setValue,
        watch
    } =
        useFormContext<RegisterFormForPateint>();
    const watchAllergies = watch("allergies");
    const watchConditions = watch("medicalHistory");

    const [allergyInput, setAllergyInput] = useState("");
    const removeAllergy = (allergy: string) => {
        setValue("allergies", watchAllergies.filter(a => a !== allergy));
    };

    const toggleCondition = (cond: string) => {
        if (cond === 'None') {
            setValue("medicalHistory", ["None"]);
            return;
        }
        let newConds = watchConditions.filter(c => c !== 'None');
        if (newConds.includes(cond)) {
            newConds = newConds.filter(c => c !== cond);
        } else {
            newConds.push(cond);
        }
        setValue("medicalHistory", newConds);
    };
    const handleAddAllergy = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = allergyInput.trim();
            if (val && !watchAllergies.includes(val)) {
                setValue("allergies", [...watchAllergies, val]);
            }
            setAllergyInput("");
        }
    };
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
                <label className="text-zinc-950 text-[15px] font-semibold">Do you have any known allergies?</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium text-lg">+</span>
                    <input
                        type="text"
                        placeholder="Type an allergy and press Enter..."
                        value={allergyInput}
                        onChange={e => setAllergyInput(e.target.value)}
                        onKeyDown={handleAddAllergy}
                        className="bg-zinc-50 border-0 h-12 pl-10 pr-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] outline-none transition-all text-sm placeholder:text-zinc-400"
                    />
                </div>
                {watchAllergies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {watchAllergies.map(a => (
                            <div key={a} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-[13px] font-medium text-zinc-700">
                                {a}
                                <button type="button" onClick={() => removeAllergy(a)} className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer">
                                    <X className="size-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-zinc-950 text-[15px] font-semibold">Have you been diagnosed with any long-term conditions?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { label: 'Diabetes', icon: Activity }, // Using generic icons for simplicity, can be replaced with more specific ones
                        { label: 'Hypertension', icon: Activity }, // Or custom SVG, keeping simple with generic icons
                        { label: 'Asthma', icon: Activity },
                        { label: 'Heart Disease', icon: Heart },
                        { label: '+ Other', icon: null },
                    ].map(c => {
                        const isSelected = watchConditions.includes(c.label);
                        const Icon = c.icon;
                        return (
                            <button
                                key={c.label}
                                type="button"
                                onClick={() => toggleCondition(c.label)}
                                className={`h-[52px] rounded-xl text-[13.5px] font-medium border flex items-center justify-center gap-2 transition-all ${isSelected
                                    ? 'border-[#00c950] bg-[#f0fdf4] text-[#00c950]'
                                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                                    }`}
                            >
                                {Icon && <Icon className="size-4" />}
                                {c.label}
                            </button>
                        );
                    })}
                    <button
                        type="button"
                        onClick={() => toggleCondition('None')}
                        className={`h-[52px] rounded-xl text-[13.5px] font-semibold flex items-center justify-center gap-2 transition-all ${watchConditions.includes('None')
                            ? 'bg-[#00c950] text-white shadow-sm border-0'
                            : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                            }`}
                    >
                        {watchConditions.includes('None') && <Check className="size-4" />}
                        None
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-zinc-950 text-[15px] font-semibold">Are you currently taking any medications?</label>
                <div className="relative">
                    <Pill className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Type a medication name..."
                        className="bg-zinc-50 border-0 h-12 pl-11 pr-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] outline-none transition-all text-sm placeholder:text-zinc-400"
                        {...register("currentMedicines")}
                    />
                </div>
                <p className="text-[12px] text-zinc-500 pl-1">Include dosage if known, e.g. Metformin 500mg</p>
            </div>
        </div>
    )
}
