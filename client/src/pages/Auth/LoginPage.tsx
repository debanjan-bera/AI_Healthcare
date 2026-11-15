import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../hooks/AuthHook';
import {
  Activity,
  Apple,
  ArrowRight,
  Eye,
  Footprints,
  Heart,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import type { LoginPayload } from '../../types/Auth.interface';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: {
      mobile: '',
      password: ''
    }
  });

  const navigate = useNavigate();
  const { Login } = useAuth();

  const onSubmit = async (data: LoginPayload) => {
    try {
      await Login(data);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col md:flex-row">
      {/* Left Side (Form) */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-12 relative min-h-screen">

        <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2">
          <div className="size-9 rounded-lg bg-zinc-950 flex justify-center items-center">
            <Sparkles className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-zinc-950 text-base leading-6 tracking-tight">
            MediAI
          </span>
        </div>

        <div className="max-w-md flex mx-auto flex-col gap-8 w-full mt-12 md:mt-0">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-zinc-950 text-3xl leading-9 tracking-tight">
              Welcome back
            </h1>
            <p className="text-[#71717b] text-sm leading-5">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="mobile"
                className="font-medium text-zinc-950 text-sm leading-5"
              >
                Mobile number
              </label>
              <input
                id="mobile"
                type="tel"
                placeholder="9876543210"
                className="bg-zinc-100 text-sm leading-5 border-black/1 border-0 border-solid h-11 px-3 rounded-md focus:ring-2 focus:ring-[#00c950] focus:outline-none transition-all"
                {...register("mobile", { required: "Mobile number is required" })}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs font-bold mt-1">{errors.mobile.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="font-medium text-zinc-950 text-sm leading-5"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="font-medium text-[#2b7fff] text-xs leading-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-zinc-100 text-sm leading-5 border-black/1 border-0 border-solid pr-10 h-11 px-3 rounded-md w-full focus:ring-2 focus:ring-[#00c950] focus:outline-none transition-all"
                  {...register("password", { required: "Password is required" })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent p-0 cursor-pointer flex items-center justify-center">
                  <Eye className="size-4 text-[#71717b] hover:text-zinc-900 transition-colors" />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-bold mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <input type="checkbox" id="remember" className="size-4 rounded border-zinc-300 text-[#00c950] focus:ring-[#00c950]" />
              <label
                htmlFor="remember"
                className="cursor-pointer font-normal text-[#71717b] text-sm leading-5 select-none"
              >
                Remember me for 30 days
              </label>
            </div>

            <button type="submit" disabled={isSubmitting} className="font-semibold rounded-lg bg-[#00c950] text-white text-sm leading-5 w-full h-11 flex justify-center items-center cursor-pointer hover:bg-[#00b045] transition-all disabled:opacity-75 disabled:cursor-not-allowed border-0 mt-2 shadow-lg shadow-[#00c950]/20 active:scale-[0.98]">
              {isSubmitting ? "Signing in..." : "Sign in"}
              <ArrowRight className="size-4 ml-2" />
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="bg-zinc-200 flex-1 h-px" />
            <span className="text-[#71717b] text-xs font-semibold tracking-wider">
              OR CONTINUE WITH
            </span>
            <div className="bg-zinc-200 flex-1 h-px" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="font-medium bg-white text-zinc-950 border border-zinc-200 border-solid gap-2 h-11 rounded-xl flex justify-center items-center cursor-pointer hover:bg-zinc-50 transition-colors active:scale-[0.98]"
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="font-medium bg-white text-zinc-950 border border-zinc-200 border-solid gap-2 h-11 rounded-xl flex justify-center items-center cursor-pointer hover:bg-zinc-50 transition-colors active:scale-[0.98]"
            >
              <Apple className="size-5 fill-zinc-950" />
              Apple
            </button>
          </div>

          <div className="flex justify-center items-center gap-1 mt-4">
            <p className="text-[#71717b] text-sm leading-5">
              Don't have an account?
            </p>
            <Link
              to="/register"
              className="font-semibold text-zinc-950 text-sm leading-5 hover:underline"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side (Dashboard Preview) */}
      <div className=" flex-1 hidden md:block h-screen sticky top-0">
        <div className="relative bg-[linear-gradient(135deg,#FFE4E1_0%,#FFD9C7_35%,#E8D5F2_75%,#D6E4F5_100%)]  flex p-12 flex-col justify-between w-full h-full overflow-hidden">
          <div className="size-32 rounded-full bg-white/50 absolute right-12 top-12" />
          <div className="size-40 rounded-full bg-white/40 absolute left-10 bottom-20" />
         
          <div className="relative z-10 flex flex-col gap-2">
            <div className="inline-flex rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 items-center gap-2 w-fit shadow-sm border border-black/5">
              <div className="size-2 rounded-full bg-[#00c950]" />
              <span className="font-semibold text-zinc-800 text-xs">
                AI-powered health insights
              </span>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="max-w-sm shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-2xl bg-white border-black/1 border-0 border-solid p-6 gap-4 w-full">
              <div className="p-0 gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-zinc-950 flex justify-center items-center">
                      <Activity className="size-4 text-white" />
                    </div>
                    <span className="font-semibold text-zinc-950 text-sm leading-5">
                      Health Overview
                    </span>
                  </div>
                  <MoreHorizontal className="size-4 text-[#71717b]" />
                </div>
              </div>
              <div className="flex p-0 flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-zinc-100 flex p-3 flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Heart className="size-3 text-red-500" />
                      <span className="text-[#71717b] text-xs leading-4">
                        Heart rate
                      </span>
                    </div>
                    <div className="items-baseline flex gap-1">
                      <span className="font-bold text-zinc-950 text-lg leading-7">
                        72
                      </span>
                      <span className="text-[#71717b] text-xs leading-4">bpm</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-zinc-100 flex p-3 flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Footprints className="size-3 text-[#2b7fff]" />
                      <span className="text-[#71717b] text-xs leading-4">Steps</span>
                    </div>
                    <div className="items-baseline flex gap-1">
                      <span className="font-bold text-zinc-950 text-lg leading-7">
                        8.2k
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-zinc-100 flex p-3 flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#71717b] text-xs leading-4">
                      Weekly activity
                    </span>
                    <span className="font-medium text-zinc-950 text-xs leading-4">
                      +12%
                    </span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    <div className="h-[40%] rounded-sm bg-[#2b7fff]/30 flex-1" />
                    <div className="h-[60%] rounded-sm bg-[#2b7fff]/40 flex-1" />
                    <div className="h-[50%] rounded-sm bg-[#2b7fff]/50 flex-1" />
                    <div className="h-[75%] rounded-sm bg-[#2b7fff]/60 flex-1" />
                    <div className="h-[55%] rounded-sm bg-[#2b7fff]/70 flex-1" />
                    <div className="h-[90%] rounded-sm bg-[#2b7fff] flex-1" />
                    <div className="h-[70%] rounded-sm bg-[#2b7fff]/80 flex-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-sm shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-2xl bg-white border-black/1 border-0 border-solid -mt-2 p-4 gap-2 w-full">
              <div className="flex p-0 items-center gap-3">
                <div className="size-10 shrink-0 rounded-full bg-[#00c950] flex justify-center items-center">
                  <Sparkles className="size-5 text-green-50" />
                </div>
                <div className="flex flex-col flex-1 gap-0.5">
                  <span className="font-semibold text-zinc-950 text-sm leading-5">
                    AI suggestion
                  </span>
                  <span className="text-[#71717b] text-xs leading-4">
                    Try a 10-min walk to boost your daily score
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col gap-2">
            <h2 className="max-w-sm font-bold text-zinc-950 text-2xl leading-8 tracking-tight">
              Your intelligent companion for better health
            </h2>
            <p className="max-w-sm text-zinc-950/70 text-sm leading-5">
              Track, understand, and improve your wellbeing with personalized AI
              insights.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}
