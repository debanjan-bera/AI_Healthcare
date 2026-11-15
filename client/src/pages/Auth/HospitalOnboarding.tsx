import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Building,
  Lock,
} from "lucide-react";
import HospitalInfoForm from "../../components/Auth/RegistrationSteps/Hospital/HospitalInfoForm";
import ContactForm from "../../components/Auth/RegistrationSteps/Hospital/ContactForm";
import DepartmentsForm from "../../components/Auth/RegistrationSteps/Hospital/DepartmentsForm";
import HospitalAddressForm from "../../components/Auth/RegistrationSteps/Hospital/HospitalAddressForm";
import SpecialtiesFacilitiesForm from "../../components/Auth/RegistrationSteps/Hospital/SpecialtiesFacilitiesForm";
import BedCapacityForm from "../../components/Auth/RegistrationSteps/Hospital/BedCapacityForm";
import AdditionalFacilitiesForm from "../../components/Auth/RegistrationSteps/Hospital/AdditionalFacilitiesForm";
import type { RegisterFormForHospital } from "../../types/Hospital.interface";
import { useAuth } from "../../hooks/AuthHook";
import { GEOAPIFY_KEY } from "../../config/config";
import { AddressForm } from "../../components/Auth/RegistrationSteps/Patients/AddressForm";

export default function HospitalOnboarding() {
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const methods = useForm<RegisterFormForHospital>({
    defaultValues: {
      phones: [{ value: "" }],
      departments: [{ name: "", description: "" }],
      specialties: [],
      facilities: [],
      services: [],
      pharmacyAvailable: false,
      bloodBankAvailable: false,
      latitude: 0,
      longitude: 0
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    trigger,
    setValue
  } = methods;

  const onSubmit = async (data: RegisterFormForHospital) => {
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

          setValue("latitude", lat);
          setValue("longitude", lon);
        }
      } catch (err) {
        console.error("Failed to forward geocode", err);
      }
    }

    // Format the payload exactly as requested
    const hospitalPayload = {
      hospitalName: data.hospitalName,
      hospitalType: data.hospitalType,
      registrationNumber: data.registrationNumber,
      establishedYear: data.establishedYear,
      description: data.description,

      contact: {
        phones: data.phones.map(p => p.value).filter(v => v),
        emergencyPhone: data.emergencyPhone,
        email: data.email,
        website: data.website
      },

      location: {
        address: data.address,
        pincode: data.pincode,
        city: data.city,
        state: data.state,
        country: data.country,
        coordinates: {
          latitude: lat,
          longitude: lon
        }
      },

      departments: data.departments.filter(d => d.name && d.description),
      specialties: data.specialties.map(s => s.value).filter(v => v),
      facilities: data.facilities.map(f => f.value).filter(v => v),
      services: data.services.map(s => s.value).filter(v => v),

      pharmacyAvailable: data.pharmacyAvailable,
      bloodBankAvailable: data.bloodBankAvailable,

      bedCapacity: {
        total: data.bedTotal,
        available: data.bedAvailable,
        icuTotal: data.icuTotal,
        icuAvailable: data.icuAvailable,
        ventilatorTotal: data.ventilatorTotal,
        ventilatorAvailable: data.ventilatorAvailable
      }
    };

    console.log("Hospital Payload:", JSON.stringify(hospitalPayload, null, 2));

    // Simulate API call since real server API is not ready
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Registering Hospital Facility...',
        success: () => {
          setTimeout(() => {
            navigate("/");
            refreshAuth();
          }, 1000);
          return 'Hospital Registered Successfully!';
        },
        error: 'Failed to register',
      }
    );
  };

  const handleNextStep = async (fieldsToValidate?: (keyof RegisterFormForHospital)[]) => {
    if (fieldsToValidate && fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }
    setStep((s) => Math.min(s + 1, 7));
  };

  const handlePrevStep = () => {
    if (step === 1) {
      navigate("/register/onboarding");
      return;
    }
    setStep((s) => Math.max(s - 1, 1));
  };

  const renderStepHeader = () => {
    let title = "";
    let subtitle = "";
    let icon = null;

    switch (step) {
      case 1:
        title = "Hospital Information";
        subtitle = "Basic details to establish your facility profile.";
        icon = <Building className="size-8 text-[#00c950] shrink-0" />;
        break;

      case 2:
        title = "Contact Details";
        subtitle = "How patients and partners can reach you.";
        break;
      case 3:
        title = "Departments";
        subtitle = "List the medical departments in your hospital.";
        break;
      case 4:
        title = "Facility Location";
        subtitle = "Pinpoint your hospital on the map.";
        break;
      case 5:
        title = "Specialties & Services";
        subtitle = "What makes your hospital stand out.";
        break;
      case 6:
        title = "Bed Capacity";
        subtitle = "Current availability to assist with emergency routing.";
        break;
      case 7:
        title = "Additional Facilities";
        subtitle = "Important utilities and capabilities.";
        break;
    }

    return (
      <div className="flex flex-col gap-1.5 mb-6">
        <div className="flex items-center">
          {icon}
          <h1 className={`font-bold text-zinc-950 text-[32px] leading-tight tracking-tight ${icon ? 'ml-3' : ''}`}>
            {title}
          </h1>
        </div>
        <p className="text-zinc-500 text-sm">{subtitle}</p>
      </div>
    );
  };

  const renderProgressBar = () => {
    const totalSteps = 7;
    return (
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isActive = step >= stepNum;
          return (
            <div
              key={stepNum}
              className={`h-1 flex-1 rounded-full transition-colors ${isActive ? 'bg-[#00c950]' : 'bg-zinc-200'}`}
            />
          );
        })}
      </div>
    );
  };

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
          {renderStepHeader()}
          {renderProgressBar()}

          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-4"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
                e.preventDefault();
              }
            }}
          >
            <FormProvider {...methods}>

              {step === 1 && <HospitalInfoForm />}
              {step === 2 && <ContactForm />}
              {step === 3 && <DepartmentsForm />}
              {step === 4 && <AddressForm />}
              {step === 5 && <SpecialtiesFacilitiesForm />}
              {step === 6 && <BedCapacityForm />}
              {step === 7 && <AdditionalFacilitiesForm />}

              {step < 7 && (
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
                      if (step === 1) handleNextStep(['hospitalName', 'hospitalType', 'establishedYear', 'registrationNumber', 'description']);
                      else if (step === 2) handleNextStep(['emergencyPhone', 'email']);
                      else if (step === 4) handleNextStep(['address', 'pincode', 'city', 'state', 'country']);
                      else if (step === 6) handleNextStep(['bedTotal', 'bedAvailable', 'icuTotal', 'icuAvailable', 'ventilatorTotal', 'ventilatorAvailable']);
                      else handleNextStep();
                    }}
                    className="flex-1 font-semibold rounded-[14px] bg-[#00c950] text-white h-[52px] flex justify-center items-center gap-2 cursor-pointer hover:bg-[#00b045] transition-all border-0 shadow-[0_4px_14px_0_rgba(0,201,80,0.39)] active:scale-[0.98]"
                  >
                    Continue
                    <ArrowRight className="size-[18px]" strokeWidth={2.5} />
                  </button>
                </div>
              )}

              {step === 7 && (
                <div className="flex flex-col items-center w-full max-w-[500px] mx-auto gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-semibold rounded-[14px] bg-[#00c950] text-white h-[56px] flex justify-center items-center gap-2 cursor-pointer hover:bg-[#00b045] transition-all disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-[0_4px_14px_0_rgba(0,201,80,0.39)] active:scale-[0.98] text-[16px]"
                  >
                    {isSubmitting ? "Processing..." : "Register Hospital"}
                    <Lock className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="text-zinc-500 text-[13px] font-semibold hover:text-zinc-800 transition-colors border-0 bg-transparent cursor-pointer"
                  >
                    Go Back
                  </button>
                </div>
              )}

            </FormProvider>
          </form>

        </div>
      </div>
    </div>
  );
}
