
import { Apple, Eye, EyeClosed, Sparkles } from "lucide-react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"
import { RegisterDynamicSide } from "../../components/Auth/DynamicSide";
import { useAuth } from "../../hooks/AuthHook";
import type { RegisterPayload } from "../../types/Auth.interface";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();
  interface RegisterForm {
    name: string,
    mobile: string,
    password: string
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const { CreateAccount } = useAuth();

  const onSubmit = async (data: RegisterPayload) => {
    try {
      const res = await CreateAccount(data);
      console.log(res);
      if (res?.success) {
        toast.success("Registered successfully!");
        navigate("/register/onboarding");
      }
    }
    catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-950 flex flex-col md:flex-row overflow-x-hidden">
      <div className="flex-1 flex flex-col p-8 md:p-12 relative min-h-screen md:max-w-[50%] lg:max-w-[75%]">

        {/* Logo */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2">
          <div className="size-9 rounded-lg bg-zinc-950 flex justify-center items-center">
            <Sparkles className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-zinc-950 text-base leading-6 tracking-tight">
            MediAI
          </span>
        </div>
        <div className="max-w-[440px] pt-4 flex flex-col w-full mx-auto my-auto animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex flex-col gap-1 mb-8">
            <h1 className="font-bold text-zinc-950 text-[28px] leading-9 tracking-tight">
              Create your account
            </h1>
            <p className="text-zinc-500 text-[15px]">
              Join MediAI and get personalized health insights
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-600 text-sm">Full name</label>
              <input
                placeholder="Jane Doe"
                className="bg-neutral-100 border-0 h-12 px-4 rounded-xl focus:ring-2 focus:ring-[#00c950] focus:outline-none transition-all text-sm placeholder:text-neutral-500"
                {...register("name", { required: "Required" })}
              />
              {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-600 text-sm">Mobile number</label>
              <input
                type="tel"
                placeholder="+91 9823456789"
                className="bg-neutral-100 border-0 h-12 px-4 rounded-xl focus:ring-2 focus:ring-[#00c950] focus:outline-none transition-all text-sm placeholder:text-neutral-500"
                {...register("mobile", {
                  required: "Required",
                  setValueAs: (value: string) => value.replace(/\s+/g, ""),
                  maxLength: { value: 10, message: "Maximum 10 digits allowed" },
                  pattern: { value: /^[0-9]+$/, message: "Only digits are allowed" }
                })}
              />
              {errors.mobile && <p className="text-red-500 text-xs font-medium">{errors.mobile.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-600 text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="bg-neutral-100 border-0 h-12 px-4 pr-10 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:outline-none transition-all text-sm placeholder:text-neutral-500"
                  {...register("password", {
                    required: "Required",
                    minLength: { value: 6, message: "Min 6 chars" }
                  })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors bg-transparent border-0 cursor-pointer p-1">
                  {showPassword ? <EyeClosed className="size-[18px]" /> : <Eye className="size-[18px]" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password.message}</p>}
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input type='checkbox' id="terms" className="shrink-0 mt-1 size-4 rounded text-[#00c950] border-zinc-300 focus:ring-[#00c950]" required />
              <label htmlFor="terms" className="text-zinc-500 text-[13px] leading-relaxed select-none cursor-pointer">
                I agree to the <span className="font-semibold text-zinc-900">Terms of Service</span> and <span className="font-semibold text-zinc-900">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              className="font-semibold rounded-[14px] bg-[#00c950] text-white h-[52px] flex justify-center items-center gap-2 cursor-pointer hover:bg-[#00b045] transition-all border-0 shadow-[0_4px_14px_0_rgba(0,201,80,0.39)] active:scale-[0.98] mt-4"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center gap-4 mt-4 mb-4">
            <div className="bg-zinc-100 flex-1 h-[2px]" />
            <span className="text-zinc-400 text-xs font-bold tracking-[0.1em] uppercase">OR CONTINUE WITH</span>
            <div className="bg-zinc-100 flex-1 h-[2px]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="font-medium text-zinc-700 border-2 border-zinc-100 bg-white rounded-[14px] h-[52px] flex justify-center items-center gap-2 cursor-pointer hover:bg-zinc-50 hover:border-zinc-200 transition-all active:scale-[0.98]">
              <svg className="size-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button type="button" className="font-medium text-zinc-700 border-2 border-zinc-100 bg-white rounded-[14px] h-[52px] flex justify-center items-center gap-2 cursor-pointer hover:bg-zinc-50 hover:border-zinc-200 transition-all active:scale-[0.98]">
              <Apple className="size-5 fill-zinc-900" /> Apple
            </button>
          </div>

          <p className="text-center text-zinc-500 text-[15px] mt-4">
            Already have an account? <Link to="/login" className="font-semibold text-zinc-900 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
      <RegisterDynamicSide />
    </div>
  )
}