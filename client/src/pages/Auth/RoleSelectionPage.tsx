import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Ambulance,
  ArrowRight,
  Briefcase,
  Building,
  Building2,
  CheckCircle2,
  Pill,
  Sparkles,
  Stethoscope,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string>("Patient");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole === "Patient") {
      localStorage.setItem("role", selectedRole);
      navigate("/register/onboarding/patient");
    }
    else if (selectedRole === "Hospital") {
      localStorage.setItem("role", selectedRole);
      navigate("/register/onboarding/hospital");
    }
    else if (selectedRole === "") {
      localStorage.setItem("role", "");
      toast.error("Please select a role");
    }
    else {

      toast.error("Onboarding for this role is coming soon!");
    }
  };

  const roles = [
    { id: "Patient", icon: User, title: "patient", desc: "Track health & book consultations" },
    { id: "Doctor", icon: Stethoscope, title: "doctor", desc: "Manage patients & appointments" },
    { id: "Hospital", icon: Building, title: "hospital_admin", desc: "Multi-department care system" },
    { id: "Clinic", icon: Building2, title: "clinic_admin", desc: "Small practice management" },
    { id: "Pharmacy", icon: Pill, title: "pharmacist", desc: "Prescriptions & inventory" },
    { id: "Ambulance Operator", icon: Ambulance, title: "ambulance_operator", desc: "Emergency response & dispatch" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-950 flex flex-col md:flex-row overflow-x-hidden">
      <div className={`flex-1 flex flex-col p-8 md:p-12 relative min-h-screen block w-full`}>
        {/* Logo */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2">
          <div className="size-9 rounded-lg bg-zinc-950 flex justify-center items-center">
            <Sparkles className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-zinc-950 text-base leading-6 tracking-tight">
            MediAI
          </span>
        </div>

        <div className="max-w-[580px] pt-4 md:pt-0 flex flex-col w-full mx-auto my-auto animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex flex-col gap-1.5 mb-6">
            <div className="flex items-center">
              <h1 className={`font-bold text-zinc-950 text-[32px] leading-tight tracking-tight`}>
                Choose your role
              </h1>
            </div>
            <p className="text-zinc-500 text-sm">Select the role that best describes you to personalize your experience</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {roles.map((r) => {
                const isActive = selectedRole === r.id;
                const Icon = r.icon;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`flex flex-col p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${isActive ? "bg-[#f0fdf4] border-[#00c950] shadow-sm" : "bg-white border-zinc-100 hover:border-zinc-200"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className={`size-10 rounded-xl flex justify-center items-center ${isActive ? "bg-[#00c950]" : "bg-zinc-100"}`}>
                        <Icon className={`size-5 ${isActive ? "text-white" : "text-zinc-700"}`} />
                      </div>
                      {isActive && <CheckCircle2 className="size-[22px] fill-[#00c950] text-white" />}
                    </div>
                    <h3 className={`font-semibold text-[15px] mb-1 text-zinc-900`}>{r.title}</h3>
                    <p className={`text-[12px] leading-snug font-medium ${isActive ? "text-[#00c950]" : "text-zinc-500"}`}>{r.desc}</p>
                  </div>
                );
              })}

              <div
                onClick={() => setSelectedRole("Employee")}
                className={`col-span-1 sm:col-span-3 flex items-center p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${selectedRole === "Employee" ? "bg-[#f0fdf4] border-[#00c950] shadow-sm" : "bg-white border-zinc-100 hover:border-zinc-200"
                  }`}
              >
                <div
                  className={`size-10 rounded-xl flex justify-center items-center shrink-0 mr-4 ${selectedRole === "Employee" ? "bg-[#00c950]" : "bg-zinc-100"
                    }`}
                >
                  <Briefcase className={`size-5 ${selectedRole === "Employee" ? "text-white" : "text-zinc-700"}`} />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className={`font-semibold text-[15px] mb-0.5 text-zinc-900`}>Employee</h3>
                  <p className={`text-[12px] ${selectedRole === "Employee" ? "text-[#00c950] font-medium" : "text-zinc-500"}`}>
                    Staff access to internal tools
                  </p>
                </div>
                {selectedRole === "Employee" ? (
                  <CheckCircle2 className="size-[22px] fill-[#00c950] text-white ml-auto" />
                ) : (
                  <ArrowRight className="size-4 text-zinc-400 ml-auto" />
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleContinue}
                className="flex-1 font-semibold rounded-[14px] bg-[#00c950] text-white h-[52px] flex justify-center items-center gap-2 cursor-pointer hover:bg-[#00b045] transition-all border-0 shadow-[0_4px_14px_0_rgba(0,201,80,0.39)] active:scale-[0.98]"
              >
                Continue
                <ArrowRight className="size-[18px]" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
