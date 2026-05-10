import React, { useState } from 'react';
import { HeartPulse, Sparkles, Eye, EyeOff, ArrowRight, ChevronLeft, User, Stethoscope, Building2, Pill, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import RegisterIllustration from '../../assets/98ee2bdd-7497-4317-9bbb-8784c0a18dd1.png';

export enum BloodGroup {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-",
}

const Register1: React.FC = () => {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const totalSteps = 5;
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger, watch, setValue } = useForm({
        defaultValues: { role: 'Patient' }
    });

    const selectedRole = watch('role');

    const nextStep = async () => {
        let fieldsToValidate: string[] = [];
        if (step === 1) fieldsToValidate = ['fullName', 'mobile', 'password'];
        if (step === 2) fieldsToValidate = ['role'];
        if (step === 3) fieldsToValidate = ['age', 'gender', 'bloodGroup', 'height', 'weight'];
        if (step === 4) fieldsToValidate = ['allergies', 'medicalHistory', 'currentMedicines'];
        if (step === 5) fieldsToValidate = ['street', 'city', 'state', 'pincode'];

        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) {
            setStep(prev => Math.min(prev + 1, totalSteps + 1));
        }
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const onSubmit = async (data: any) => {
        console.log("Registered Data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Registration successful! Redirecting to home...");
        setIsRedirecting(true);
        navigate('/');
    };

    const inputClasses = "w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/5 focus:border-[#0066FF] transition-all";
    const labelClasses = "text-sm font-semibold text-gray-700";

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <label className={labelClasses}>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register('fullName', { required: 'Name is required' })}
                                className={inputClasses}
                            />
                            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className={labelClasses}>Mobile Number</label>
                            <input
                                type="text"
                                placeholder="+91-1234567890"
                                {...register('mobile', { required: 'Mobile Number is required' })}
                                className={inputClasses}
                            />
                            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className={labelClasses}>Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                                    className={inputClasses}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message as string}</p>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <input type="hidden" {...register('role', { required: 'Please select an account type' })} />
                        {[
                            { id: 'Patient', title: 'Patient', desc: 'Book appointments, store records, chat with the AI assistant.', icon: User },
                            { id: 'Doctor / Clinic', title: 'Doctor / Clinic', desc: 'Manage your schedule, patients and consultations.', icon: Stethoscope },
                            { id: 'Hospital', title: 'Hospital', desc: 'Run departments, doctors, and emergency services.', icon: Building2 },
                            { id: 'Medicine Shop', title: 'Medicine Shop', desc: 'Inventory, prescriptions and home delivery.', icon: Pill },
                        ].map((type) => {
                            const isSelected = selectedRole === type.id;
                            return (
                                <div
                                    key={type.id}
                                    onClick={() => setValue('role', type.id, { shouldValidate: true })}
                                    className={`relative flex items-center gap-4 p-2.5 rounded-lg border-[1.5px] cursor-pointer transition-all ${isSelected
                                            ? 'border-primary'
                                            : 'border-gray-100 hover:border-gray-200 bg-white'
                                        }`}
                                >
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                                        }`}>
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
                                    <div className="flex-shrink-0 ml-2">
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
                        {errors.role && <p className="text-red-500 text-xs">{errors.role.message as string}</p>}
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className={labelClasses}>Age</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 28"
                                    {...register('age', { required: 'Age required' })}
                                    className={inputClasses}
                                />
                                {errors.age && <p className="text-red-500 text-xs">{errors.age.message as string}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Gender</label>
                                <select
                                    {...register('gender', { required: 'Gender required' })}
                                    className={inputClasses}
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message as string}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className={labelClasses}>Height (cm)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 175"
                                    {...register('height')}
                                    className={inputClasses}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Weight (kg)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 70"
                                    {...register('weight')}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClasses}>Blood Group</label>
                            <select
                                {...register('bloodGroup', { required: 'Blood Group required' })}
                                className={inputClasses}
                            >
                                <option value="">Select Type</option>
                                {Object.values(BloodGroup).map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                            {errors.bloodGroup && <p className="text-red-500 text-xs">{errors.bloodGroup.message as string}</p>}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <label className={labelClasses}>Allergies</label>
                            <input
                                type="text"
                                placeholder="e.g. Peanuts, Penicillin"
                                {...register('allergies')}
                                className={inputClasses}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelClasses}>Medical History</label>
                            <textarea
                                placeholder="Past surgeries, chronic conditions..."
                                rows={2}
                                {...register('medicalHistory')}
                                className={`${inputClasses} resize-none`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelClasses}>Current Medicines</label>
                            <textarea
                                placeholder="Any medications you are taking now..."
                                rows={2}
                                {...register('currentMedicines')}
                                className={`${inputClasses} resize-none`}
                            />
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <label className={labelClasses}>Street Address</label>
                            <input type="text" placeholder="123 Main St" {...register('street')} className={inputClasses} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className={labelClasses}>City</label>
                                <input type="text" placeholder="City" {...register('city')} className={inputClasses} />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>State</label>
                                <input type="text" placeholder="State" {...register('state')} className={inputClasses} />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Pincode</label>
                                <input type="text" placeholder="Zip code" {...register('pincode')} className={inputClasses} />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Country</label>
                                <input type="text" placeholder="Country" {...register('country')} className={inputClasses} />
                            </div>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                            <h4 className="text-sm font-bold text-gray-900 mb-4 mt-2">Insurance Details (Optional)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={labelClasses}>Provider Name</label>
                                    <input type="text" placeholder="Provider" {...register('insuranceProvider')} className={inputClasses} />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClasses}>Policy Number</label>
                                    <input type="text" placeholder="Policy No." {...register('insuranceNumber')} className={inputClasses} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen w-full font-inter overflow-hidden bg-white">
            {/* Left Side - Image & Info Section */}
            <div className="hidden lg:flex w-1/2 bg-[#f4f7ff] relative overflow-hidden border-r border-gray-100 flex-col items-center">

                {/* The Illustration - Anchored to top so original logo/text is visible */}
                <img
                    src={RegisterIllustration}
                    alt="Healthcare Illustration"
                    className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
                />

                {/* Bottom Gradient Mask - Properly goes from solid bottom to transparent top */}
                <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-[#E9EAFC] via-[#E9EAFC]/95 to-transparent z-10 pointer-events-none"></div>

                {/* Our Text Content - Anchored to bottom over the gradient */}
                <div className="absolute bottom-0 left-0 w-full z-20 pb-16 px-12 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-100 text-[#0066FF] text-xs font-bold mb-5 shadow-sm">
                        <Sparkles size={14} className="text-[#0066FF]" />
                        <span className="uppercase tracking-wider">Join us today</span>
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0a0c10] mb-4 leading-[1.2] tracking-tight">
                        Join the Future of Healthcare
                    </h1>
                    <p className="text-gray-600 text-[15px] max-w-sm leading-relaxed font-medium">
                        Create your patient profile to get personalized AI consultations, manage your health records, and connect with top doctors instantly.
                    </p>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 lg:px-20 h-screen ">
                <div className="w-full max-w-md py-12">
                    {step <= totalSteps ? (
                        <>
                            <div className="mb-8">
                                <div className="flex items-center justify-end mb-4 h-6">
                                    {/* Top space preserved */}
                                </div>

                                <h1 className="text-4xl font-bold text-[#0a0c10] mb-3">
                                    {step === 2 ? "What describes you best?" : "Create Account"}
                                </h1>
                                <p className="text-gray-500 font-medium mb-1">
                                    Step {step} of {totalSteps}: <span className="text-gray-800">{["Account Details", "Account Type", "Personal Info", "Medical Background", "Address & Contact"][step - 1]}</span>
                                </p>
                                {step === 2 && (
                                    <p className="text-gray-500 font-medium text-[15px]">Choose your account type — you can invite teammates later.</p>
                                )}

                                <div className="flex gap-2 w-full mt-6">
                                    {[...Array(totalSteps)].map((_, index) => (
                                        <div key={index} className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-primary transition-all duration-500 ease-out ${index < step ? 'w-full' : 'w-0'}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); }}>
                                {renderStepContent()}

                                <div className="flex items-center justify-between border-t border-gray-100">
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex items-center text-base font-bold text-gray-700 bg-neutral-200 rounded-full hover:bg-neutral-300 transition-colors px-4 py-3"
                                        >
                                            <ChevronLeft size={20} className="mr-2" /> Back
                                        </button>
                                    ) : (
                                        <div />
                                    )}

                                    <button
                                        className="bg-primary text-white px-8 py-3.5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary/80 transition-all active:scale-[0.98] shadow-lg shadow-gray-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                        type='button'
                                        onClick={step === totalSteps ? handleSubmit(onSubmit) : nextStep}
                                        disabled={isSubmitting || isRedirecting}
                                    >
                                        {isSubmitting || isRedirecting ? 'Processing...' : (step === totalSteps ? 'Complete Registration' : 'Continue')}
                                        {step < totalSteps && <ArrowRight size={18} />}
                                    </button>
                                </div>
                            </form>

                            {step === 1 && (
                                <>


                                    <div className="mt-10 text-center">
                                        <p className="text-gray-500 font-medium">
                                            Already have an account? <Link to="/login" className="text-[#0066FF] font-bold hover:underline">Sign in</Link>
                                        </p>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="text-center animate-in zoom-in-95 duration-500">
                            {/* Success state */}
                            <div className="w-20 h-20 bg-blue-50 text-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
                                <HeartPulse size={40} className="animate-pulse" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#0a0c10] mb-4">Registration Complete!</h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">Your patient profile has been successfully created. Welcome to the unified platform.</p>
                            <Link
                                to="/login"
                                className="inline-block w-full bg-[#0066FF] text-white py-4 rounded-2xl font-bold hover:bg-[#0052CC] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20"
                            >
                                Go to Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register1;
