import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Heart,
  Lock,
} from "lucide-react";
import { AddressForm } from "../../components/Auth/RegistrationSteps/Patients/AddressForm";
import InforForm from "../../components/Auth/RegistrationSteps/Patients/InforForm";
import LifestyleForm from "../../components/Auth/RegistrationSteps/Patients/Lifestyle";
import NoticeDisclaimer from "../../components/Auth/RegistrationSteps/Patients/NoticeForm";
import PhysicalProfile from "../../components/Auth/RegistrationSteps/Patients/PhysicalProfile";
import EmerencyContact from "../../components/Auth/RegistrationSteps/Patients/EmerencyContact";
import HealthInfo from "../../components/Auth/RegistrationSteps/Patients/HealthInfo";
import type { BloodGroupType, CreatePatientPayload, RegisterFormForPateint } from "../../types/Patient.interface";
import { api } from "../../utils";
import { useAuth } from "../../hooks/AuthHook";
import { GEOAPIFY_KEY } from "../../config/config";

export default function OnBoarding() {
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const methods = useForm<RegisterFormForPateint>({
    defaultValues: {
      gender: "Male",
      heightUnit: 'cm',
      weightUnit: 'kg',
      allergies: [],
      medicalHistory: [],
      currentMedicines: [],
      agreedToDisclaimer: false,
      preferredLanguage: 'English',
      latitude: 0,
      longitude: 0
    }
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    trigger,
    watch,
    setValue
  } = methods;

  const watchDisclaimer = watch("agreedToDisclaimer");

  const onSubmit = async (data: RegisterFormForPateint) => {
    let lat = data.latitude;
    let lon = data.longitude;

    if (!lat || !lon) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
            data.address
          )}&apiKey=${GEOAPIFY_KEY}`
        );

        if (response.ok) {
          const locationData = await response.json();
          lat = locationData.features?.[0]?.geometry?.coordinates[1] || lat;
          lon = locationData.features?.[0]?.geometry?.coordinates[0] || lon;

          // Also update the form state for good measure
          setValue("latitude", lat);
          setValue("longitude", lon);
        }
      } catch (err) {
        console.error("Failed to forward geocode", err);
      }
    }

    const patientPayload: CreatePatientPayload = {
      dob: new Date(data.dob),

      gender: data.gender as "Male" | "Female" | "Other",

      preferredLanguage: data.preferredLanguage || "en",

      bloodGroup: data.bloodGroup as BloodGroupType,

      height: {
        value: Number(data.height),
        unit: data.heightUnit,
      },

      weight: {
        value: Number(data.weight),
        unit: data.weightUnit,
      },

      location: {
        address: data.address,
        pincode: data.pincode,
        city: data.city,
        state: data.state,
        country: data.country,

        coordinates: {
          latitude: lat,
          longitude: lon,
        },
      },

      emergencyContact: {
        name: data.emergencyContactName || "",
        phone: data.emergencyPhone || "",
        relationship: data.emergencyRelationship || "",
      },

      allergies: data.allergies || [],

      medicalHistory: data.medicalHistory || [],

      currentMedicines: data.currentMedicines || [],

      lifestyle: {
        smoking: data.smoke,
        alcohol: data.alcohol,
        exercise: data.exercise,
      },

    };
    const res = await api.patient.createPatient(patientPayload);
    if (res?.success) {
      navigate("/");
      await refreshAuth();
      toast.success(res.message);
      return;
    }
    toast.error(res.message);
  };

  const handleNextStep = async (fieldsToValidate?: (keyof RegisterFormForPateint)[]) => {
    if (fieldsToValidate && fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }
    setStep((s) => Math.min(s + 1, 7)); // 7 steps total
  };

  const handlePrevStep = () => {
    if (step === 1) {
      navigate("/register/onboarding")
      return;
    }
    setStep((s) => Math.max(s - 1, 1));

  };

  const renderStepHeader = () => {
    let title = "";
    let subtitle = "";
    let icon = null;
    let badge = null;

    switch (step) {
      case 1:
        title = "Tell us about yourself";
        subtitle = "Your personal details help us provide accurate health assessments and personalized medical insights.";
        break;
      case 2:
        title = "Where are you located?";
        subtitle = "Help us connect you with nearby care services.";
        break;
      case 3:
        title = "Physical Profile";
        subtitle = "Help us personalize your care experience with your vitals.";
        break;
      case 4:
        title = "Emergency Contact";
        subtitle = "Used only during emergencies to reach someone on your behalf.";
        break;
      case 5:
        title = "Your Health Information";
        subtitle = "Help us personalize your care experience.";
        break;
      case 6:
        title = "Lifestyle Information";
        subtitle = "Optional — helps us give you more relevant health insights.";
        icon = <Heart className="size-6 text-[#00c950] shrink-0" />;
        badge = <span className="px-2 py-0.5 rounded-full bg-[#00c950]/10 text-[#00c950] text-[10px] font-bold uppercase tracking-wider ml-3 -translate-y-0.5">Optional</span>;
        break;
      case 7:
        // Handled inside Step 7 specifically for centered layout
        return null;
    }

    if (step === 7) return null;

    return (
      <div className="flex flex-col gap-1.5 mb-6">
        <div className="flex items-center">
          {icon}
          <h1 className={`font-bold text-zinc-950 text-[32px] leading-tight tracking-tight ${icon ? 'ml-2' : ''}`}>
            {title}
          </h1>
          {badge}
        </div>
        <p className="text-zinc-500 text-sm">{subtitle}</p>
      </div>
    );
  };

  const renderProgressBar = () => {
    if (step === 7) return null; // No progress bar on the last disclaimer step

    const totalSteps = 7;
    return (
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalSteps - 1 }).map((_, idx) => {
          const stepNum = idx + 1;
          const isActive = step >= stepNum;
          return (
            <div
              key={stepNum}
              className={`h-1 flex-1 rounded-full transition-colors ${isActive ? 'bg-zinc-900' : 'bg-zinc-200'}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-950 flex flex-col md:flex-row overflow-x-hidden">
      {/* Left Side (Form) */}
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
          {renderStepHeader()}
          {step !== 1 && renderProgressBar()}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormProvider {...methods}>

              {/* Step 1: Personal Details */}
              {step === 1 && (
                <InforForm />
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <AddressForm />
              )}

              {/* Step 3: Physical Profile */}
              {step === 3 && (
                <PhysicalProfile />
              )}

              {/* Step 4: Emergency Contact */}
              {step === 4 && (
                <EmerencyContact />
              )}

              {/* Step 5: Health Information */}
              {step === 5 && (
                <HealthInfo />
              )}

              {/* Step 6: Lifestyle Information */}
              {step === 6 && (
                <LifestyleForm />
              )}

              {/* Step 7: Important Notice */}
              {step === 7 && (
                <NoticeDisclaimer />
              )}

              {/* Navigation Buttons for Steps 1-6 */}
              {step < 7 && (
                <>
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="font-semibold rounded-[14px] border-2 border-zinc-100 bg-white text-zinc-700 h-[52px] px-8 flex justify-center items-center gap-2 cursor-pointer hover:bg-zinc-50 hover:border-zinc-200 transition-all active:scale-[0.98]"
                    >
                      <ArrowLeft className="size-4" /> Back
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (step === 1) handleNextStep(['dob']);
                        else if (step === 3) handleNextStep(['height', 'weight', 'bloodGroup']);
                        else handleNextStep();
                      }}
                      className="flex-1 font-semibold rounded-[14px] bg-[#00c950] text-white h-[52px] flex justify-center items-center gap-2 cursor-pointer hover:bg-[#00b045] transition-all border-0 shadow-[0_4px_14px_0_rgba(0,201,80,0.39)] active:scale-[0.98]"
                    >
                      Continue
                      <ArrowRight className="size-[18px]" strokeWidth={2.5} />
                    </button>
                  </div>

                  {step === 5 && (
                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={() => handleNextStep()}
                        className="text-zinc-500 text-[13px] font-semibold hover:text-zinc-800 hover:underline transition-colors border-0 bg-transparent cursor-pointer"
                      >
                        Skip for now
                      </button>
                    </div>
                  )}
                </>
              )}

              {step === 7 && (
                <div className="flex flex-col items-center w-full max-w-[500px] mx-auto gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={!watchDisclaimer || isSubmitting}
                    className="w-full font-semibold rounded-[14px] bg-[#00c950] text-white h-[56px] flex justify-center items-center gap-2 cursor-pointer hover:bg-[#00b045] transition-all disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-[0_4px_14px_0_rgba(0,201,80,0.39)] active:scale-[0.98] text-[16px]"
                  >
                    {isSubmitting ? "Processing..." : "Get Started"}
                    <ArrowRight className="size-5" strokeWidth={2.5} />
                  </button>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200">
                    <Lock className="size-3 text-zinc-500" />
                    <span className="text-[10px] font-semibold text-zinc-500 tracking-wide uppercase">Encrypted & HIPAA compliant</span>
                  </div>
                </div>
              )}
            </FormProvider>
          </form>

        </div>


      </div>
    </div>
  );
}
