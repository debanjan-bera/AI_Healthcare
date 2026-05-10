import { Eye, EyeOff, User } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";


// 🔒 Strong typing (recommended)
interface RegisterFormValues {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

const StepAccount: React.FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<RegisterFormValues>();
    const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Full Name */}
      <div className="space-y-2">
                            <label className='text-sm font-semibold text-gray-700'>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register('fullName', { required: 'Name is required' })}
                                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/5 focus:border-[#0066FF] transition-all"
                            />
                            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message as string}</p>}
                        </div>
      
      {/* Email */}
      <div className="space-y-2">
                            <label className='text-sm font-semibold text-gray-700'>Email Address</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                {...register('email', { 
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/5 focus:border-[#0066FF] transition-all"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                            <input
                                type="text"
                                placeholder="+91-1234567890"
                                {...register('mobile', { required: 'Mobile Number is required' })}
                                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/5 focus:border-[#0066FF] transition-all"
                            />
                            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                                    className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/5 focus:border-[#0066FF] transition-all"
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
};

export default StepAccount;