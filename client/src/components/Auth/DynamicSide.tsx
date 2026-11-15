import { Activity, ArrowUp, Building2, CalendarCheck, FileText, Footprints, Heart, MoreHorizontal, Pill, Plus, Sparkles, User } from "lucide-react"

export const LoginDynamicSide = () => {
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
}
export const RegisterDynamicSide = () => {
    return (
        <div className="flex-1 hidden md:flex flex-col relative h-screen sticky top-0 overflow-hidden bg-gradient-to-br from-[#f8f0fc] via-[#f1f0f9] to-[#e6e8f4]">

            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-12">

                {/* Main Chat Card */}

                <div className="max-w-md backdrop-blur-md shadow-2xl rounded-2xl bg-white/80 border-white/60 border-1 border-solid p-5">
                    <div className="flex mb-4 justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="size-10 rounded-full bg-[#00c950] flex justify-center items-center">
                                    <Sparkles className="size-5 text-green-50" />
                                </div>
                                <div className="size-2.5 rounded-full bg-emerald-500 border-white border-2 border-solid absolute right-0 bottom-0" />
                            </div>
                            <div>
                                <p className="font-semibold text-neutral-950 text-sm leading-5">
                                    MediAI Onboarding
                                </p>
                                <p className="text-neutral-500 text-xs leading-4">
                                    Personalize your experience
                                </p>
                            </div>
                        </div>
                        <MoreHorizontal className="size-4 text-neutral-500" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-start">
                            <div className="max-w-[85%] rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-2xl bg-gray-200 px-4 py-2.5">
                                <p className="text-neutral-950 text-sm leading-5">
                                    Welcome! Let's set up your profile. What brings you to MediAI today?
                                    👋
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="max-w-[85%] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-md bg-neutral-800 px-4 py-2.5">
                                <p className="text-white text-sm leading-5">
                                    I'm a doctor looking to manage patient records.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="max-w-[90%] rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-2xl bg-gray-200 flex px-4 py-3 flex-col gap-3">
                                <p className="text-neutral-950 text-sm leading-5">
                                    Perfect! Here's what you'll unlock as a
                                    <span className="font-semibold ml-1">Doctor</span>:
                                </p>
                                <div className="rounded-xl bg-white border-neutral-200 border-1 border-solid p-3 flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        <div className="size-[42px] rounded-[12px] bg-[#e6f7ec] flex justify-center items-center shrink-0">
                                            <FileText className="size-[20px] text-[#00c950]" strokeWidth={2.5} />
                                        </div>
                                        <span className="font-medium text-[#444] text-sm">Patient management dashboard</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="size-[42px] rounded-[12px] bg-[#f3edff] flex justify-center items-center shrink-0">
                                            <FileText className="size-[20px] text-[#7c4dff]" strokeWidth={2.5} />
                                        </div>
                                        <span className="font-medium text-[#444] text-sm">Digital prescriptions & records</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="size-[42px] rounded-[12px] bg-[#fff0e5] flex justify-center items-center shrink-0">
                                            <CalendarCheck className="size-5 text-[#ff6d00]" strokeWidth={2.5} />
                                        </div>
                                        <span className="font-medium text-[#444] text-sm">Smart appointment scheduling</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="flex mt-1 flex-wrap gap-2">
                            <div className="rounded-full bg-white border-neutral-200 border-1 border-solid flex px-3 py-1.5 items-center gap-1.5">
                                <User className="size-3 text-neutral-700" />
                                <span className="font-medium text-neutral-950 text-xs leading-4">
                                    I'm a patient
                                </span>
                            </div>
                            <div className="rounded-full bg-white border-neutral-200 border-1 border-solid flex px-3 py-1.5 items-center gap-1.5">
                                <Building2 className="size-3 text-neutral-700" />
                                <span className="font-medium text-neutral-950 text-xs leading-4">
                                    Hospital
                                </span>
                            </div>
                            <div className="rounded-full bg-white border-neutral-200 border-1 border-solid flex px-3 py-1.5 items-center gap-1.5">
                                <Pill className="size-3 text-neutral-700" />
                                <span className="font-medium text-neutral-950 text-xs leading-4">
                                    Pharmacy
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-full bg-gray-200 border-1 border-neutral-300 flex mt-4 p-2 items-center gap-2">
                        <Plus className="size-4 text-neutral-500 ml-1" />
                        <span className="text-neutral-500 text-sm leading-5 flex-1">
                            Tell us about your role...
                        </span>
                        <div className="size-8 rounded-full bg-neutral-950 flex justify-center items-center">
                            <ArrowUp className="size-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}