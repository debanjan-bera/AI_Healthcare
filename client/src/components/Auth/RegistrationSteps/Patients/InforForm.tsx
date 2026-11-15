import { Camera } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { RegisterFormForPateint } from "../../../../types/Patient.interface";

export default function InforForm() {
    const methods =
        useFormContext<RegisterFormForPateint>();

    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = methods;
    const watchGender = watch("gender");
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setValue('profilePicture', file);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-3">
                <label className="relative flex flex-col items-center justify-center w-24 h-24 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-full cursor-pointer hover:bg-zinc-100 hover:border-zinc-300 transition-all overflow-hidden group">
                    {preview ? (
                        <>
                            <img src={preview} alt="Profile preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-white mb-1" />
                                <span className="text-[10px] font-semibold text-white">Change</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <Camera className="w-6 h-6 text-zinc-400 mb-1" />
                            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Upload</span>
                        </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
                <div className="text-center">
                    <p className="text-sm font-semibold text-zinc-900">Profile Picture</p>
                    {/* <p className="text-xs text-zinc-500">Optional</p> */}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-zinc-950 text-sm font-semibold">Date of Birth</label>
                <div className="relative">
                    <input
                        type="date"
                        className="bg-white border border-zinc-200 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
                        {...register("dob", { required: "Date of Birth is required" })}
                    />
                </div>
                {errors.dob && <p className="text-red-500 text-xs font-medium">{errors.dob.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-zinc-950 text-sm font-semibold">Gender</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Male', 'Female', 'Other'].map(g => (
                        <button
                            key={g}
                            type="button"
                            onClick={() => setValue('gender', g as "" | "Male" | "Female" | "Other")}
                            className={`h-11 rounded-xl text-xs font-medium border transition-all ${watchGender === g
                                ? 'border-[#00c950] bg-[#00c950] text-white shadow-sm'
                                : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                                }`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-zinc-950 text-sm font-semibold">Preferred Language</label>
                <select
                    className="bg-white border border-zinc-200 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm text-zinc-700"
                    {...register("preferredLanguage")}
                >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Mandarin">Mandarin</option>
                </select>
            </div>
        </div>
    )
}
