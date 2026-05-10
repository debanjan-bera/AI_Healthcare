import { Building2, CheckCircle2, Pill, Stethoscope, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

interface RegisterFormValuesForRoles {
    role: string
}

export const StepRoles: React.FC = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext<RegisterFormValuesForRoles>();

    const selectedRole = watch('role');

    const [category, setCategory] = useState<string | null>(() => {
        if (selectedRole === 'Patient') return 'Patient';
        if (selectedRole === 'Doctor') return 'Doctor';
        if (['Hospital', 'Clinic', 'Pharmacy'].includes(selectedRole)) return 'Organization';
        return null;
    });

    const handleCategorySelect = (catId: string) => {
        setCategory(catId);
        if (catId === 'Patient' || catId === 'Doctor') {
            setValue('role', catId, { shouldValidate: true });
        } else if (catId === 'Organization') {
            // If organization is selected, we clear the role until they pick a subtype
            // unless they already have an organization subtype picked
            if (!['Hospital', 'Clinic', 'Pharmacy'].includes(selectedRole)) {
                setValue('role', '', { shouldValidate: true });
            }
        }
    };

    const handleSubRoleSelect = (subRoleId: string) => {
        setValue('role', subRoleId, { shouldValidate: true });
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <input type="hidden" {...register('role', { required: 'Please select an account type' })} />
            
            <div className="space-y-3">
                {[
                    { id: 'Patient', title: 'Patient', desc: 'Book appointments, store records, chat with the AI assistant.', icon: User },
                    { id: 'Doctor', title: 'Doctor', desc: 'Manage your schedule, patients and consultations.', icon: Stethoscope },
                    { id: 'Organization', title: 'Organization', desc: 'Hospitals, clinics, and pharmacies.', icon: Building2 },
                ].map((type) => {
                    const isSelected = category === type.id;
                    return (
                        <div
                            key={type.id}
                            onClick={() => handleCategorySelect(type.id)}
                            className={`relative flex items-center gap-4 p-2.5 rounded-lg border-[1.5px] cursor-pointer transition-all ${isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-100 hover:border-gray-200 bg-white'
                                }`}
                        >
                            <div className={`shrink-0 w-12 h-12 rounded-md flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                                <type.icon size={22} strokeWidth={isSelected ? 2 : 1.5} />
                            </div>
                            <div className="flex-1">
                                <h3 className={`font-bold text-[15px] ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                                    {type.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                    {type.desc}
                                </p>
                            </div>
                            <div className="shrink-0 ml-2">
                                {isSelected ? (
                                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                                        <CheckCircle2 size={16} strokeWidth={3} />
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {category === 'Organization' && (
                <div className="mt-4 p-4 border-[1.5px] border-primary/20 rounded-xl bg-primary/5 space-y-3 animate-in slide-in-from-top-2 fade-in duration-300">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Select Organization Type</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                            { id: 'Hospital', title: 'Hospital', icon: Building2 },
                            { id: 'Clinic', title: 'Clinic', icon: Stethoscope },
                            { id: 'Pharmacy', title: 'Pharmacy', icon: Pill },
                        ].map((subType) => {
                            const isSubSelected = selectedRole === subType.id;
                            return (
                                <div
                                    key={subType.id}
                                    onClick={() => handleSubRoleSelect(subType.id)}
                                    className={`flex items-center gap-3 p-3 rounded-lg border-[1.5px] cursor-pointer transition-all ${isSubSelected ? 'border-primary bg-white shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white/60'}`}
                                >
                                    <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${isSubSelected ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                        <subType.icon size={16} />
                                    </div>
                                    <span className={`flex-1 text-sm ${isSubSelected ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{subType.title}</span>
                                    {isSubSelected && <CheckCircle2 size={16} className="text-primary shrink-0" />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {errors.role && <p className="text-red-500 text-sm mt-2 font-medium">{errors.role.message as string}</p>}
        </div>
    );
};