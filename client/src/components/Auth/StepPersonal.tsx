import { useFormContext } from 'react-hook-form';
import { BloodGroup, type RegisterFormPersonal } from '../../types/Patient.interface';
import { User, Binary, Ruler, Weight, Droplets } from 'lucide-react';

export default function StepPersonal() {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegisterFormPersonal>();

    const inputClasses = "w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all";

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-2">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <User size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-500">Let us know more about your physical profile</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <User size={16} className="text-blue-500" />
                        Age
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 28"
                        {...register('age', { required: 'Age required' })}
                        className={inputClasses}
                    />
                    {errors.age && <p className="text-red-500 text-xs font-medium">{errors.age.message as string}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Binary size={16} className="text-blue-500" />
                        Gender
                    </label>
                    <select
                        {...register('gender', { required: 'Gender required' })}
                        className={inputClasses}
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs font-medium">{errors.gender.message as string}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Ruler size={16} className="text-blue-500" />
                        Height (cm)
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 175"
                        {...register('height')}
                        className={inputClasses}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Weight size={16} className="text-blue-500" />
                        Weight (kg)
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 70"
                        {...register('weight')}
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Droplets size={16} className="text-blue-500" />
                    Blood Group
                </label>
                <select
                    {...register('bloodGroup', { required: 'Blood Group required' })}
                    className={inputClasses}
                >
                    <option value="">Select Type</option>
                    {Object.values(BloodGroup).map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                    ))}
                </select>
                {errors.bloodGroup && <p className="text-red-500 text-xs font-medium">{errors.bloodGroup.message as string}</p>}
            </div>
        </div>
    )
}

