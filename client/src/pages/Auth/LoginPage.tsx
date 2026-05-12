import React, { useState } from 'react';
import { HeartPulse, Sparkles, Eye, EyeOff, ArrowRight, } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { type LoginPayload } from '../../utils/auth/auth.api';
import { useAuth } from '../../hooks/AuthHook';
import Loading from '../../components/Loading';


const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>();
  const navigate = useNavigate()
  const { Login } = useAuth();

  if (isSubmitting) {
    return <Loading />;
  }

  const onSubmit = async (data: LoginPayload) => {
    await Login(data)
    navigate("/dashboard")
  };
  return (
    <div className="flex min-h-screen w-full font-inter overflow-hidden">
      {/* Left Side - Dark Section */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-12 text-white relative">
        <div className="flex items-center gap-3">
          <div className="bg-[#0066FF] p-2 rounded-xl border border-white/10 shadow-lg shadow-blue-500/20">
            <HeartPulse className="text-white" size={28} />
          </div>
          <div>
            <h2 className="font-bold text-xl tracking-tight leading-none">AI healthcare</h2>
            <p className="text-[10px] tracking-[0.2em] text-white/40 font-semibold uppercase mt-1">Platform</p>
          </div>
        </div>

        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium mb-8">
            <Sparkles size={14} className="text-white/80" />
            <span className="uppercase tracking-wider">Just two clicks</span>
          </div>

          <h1 className="text-6xl font-bold leading-[1.1] mb-8">
            Book your<br />
            Doctor any<br />
            Time, any<span className="text-[#0066FF]">where.</span>
          </h1>

          <p className="text-lg text-white/50 leading-relaxed max-w-md">
            The unified platform connecting patients, doctors, hospitals and pharmacies — with an AI assistant by your side.
          </p>

          <div className="flex gap-4 mt-12">
            {[
              { val: '50K+', label: 'PATIENTS' },
              { val: '2.5K', label: 'DOCTORS' },
              { val: '120+', label: 'HOSPITALS' }
            ].map((stat, i) => (
              <div key={i} className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl">
                <h3 className="text-2xl font-bold mb-1">{stat.val}</h3>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-white/20 text-sm">
          © 2026 AI Healthcare Platform
        </div>

        {/* Subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0066FF]/5 blur-[120px] rounded-full -z-10" />
      </div>

      {/* Mobile Brand Header - Visible only on mobile */}
      <div className="lg:hidden absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="bg-[#0066FF] p-1.5 rounded-lg border border-white/10 shadow-lg shadow-blue-500/20">
            <HeartPulse className="text-white" size={20} />
          </div>
          <h2 className="font-bold text-lg tracking-tight text-slate-900">AI healthcare</h2>
        </div>
        <Link to="/register" className="text-xs font-bold text-[#0066FF] bg-blue-50 px-3 py-1.5 rounded-lg">Sign Up</Link>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 lg:px-20 py-12 lg:py-0 bg-white">
        <div className="w-full max-w-md mt-12 lg:mt-0">
          <div className="mb-8 lg:mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#0a0c10] mb-3 leading-tight">Welcome back 👋</h1>
            <p className="text-gray-500 text-sm lg:text-base">Sign in to continue to your healthcare workspace.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="+91-1234567890"
                  className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/5 focus:border-[#0066FF] transition-all"
                  {...register("mobile", { required: "Mobile Number is required" })}
                />
              </div>
              {errors.mobile && <p>{errors.mobile.message}</p>}

            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/5 focus:border-[#0066FF] transition-all"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0066FF] focus:ring-[#0066FF]" />
                <span className="text-sm text-gray-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-[#0a0c10] hover:underline">Forgot password?</a>
            </div>

            <button className="w-full bg-[#0066FF] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0052CC] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20"
              type='submit' disabled={isSubmitting}

            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 px-4 py-3.5  bg-gray-200/70 border border-gray-50 rounded-2xl hover:bg-gray-200 transition-all font-medium text-gray-700">
              <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-3.5 bg-gray-200/70 border border-gray-50 rounded-2xl hover:bg-gray-200 transition-all font-medium text-gray-700">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-5 h-5" />
              Microsoft
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              New here? <Link to="/register" className="text-[#0066FF] font-bold hover:underline">Create an account</Link>
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default LoginPage;
