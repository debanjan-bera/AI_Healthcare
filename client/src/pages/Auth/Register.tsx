import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RegisterWrapper from "../../layout/RegisterWrapper";
import { RegisterBanner } from "../../components/Auth/Banner";
import type { RegisterForm } from "../../types/Auth.interface";
import { stepConfigByRole } from "../../components/Auth/RegisterComponentCollections";

import { register as registerApi } from "../../utils/auth/auth.api";

const Register = () => {

    const navigate = useNavigate();

    const methods = useForm<RegisterForm>({
        defaultValues: { role: "Patient" }
    });
    const { handleSubmit, trigger, watch } = methods;

    const role = watch("role");
    const steps = stepConfigByRole[role] || stepConfigByRole["Patient"];

    const [stepIndex, setStepIndex] = useState(0);

    // Reset step index if it becomes invalid when steps change
    useEffect(() => {
        if (stepIndex >= steps.length) {
            setStepIndex(0);
        }
    }, [role, steps.length, stepIndex]);

    const currentStep = steps[stepIndex] || steps[0];
    const CurrentComponent = currentStep.component;

    const nextStep = async (): Promise<void> => {
        const isValid = await trigger(currentStep.fields);
        if (isValid) setStepIndex((prev) => prev + 1);
    };

    const prevStep = (): void => {
        setStepIndex((prev) => Math.max(0, prev - 1));
    };

    const onSubmit = async (data: RegisterForm) => {
        try {
            const loadingToast = toast.loading("Registering...");
            const response = await registerApi(data);
            toast.dismiss(loadingToast);

            if (response.successful) {
                toast.success(response.message || "Registered successfully!");
                navigate("/dashboard");
            } else {
                toast.error(response.message || "Registration failed!");
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred during registration.");
            console.error("Registration error:", error);
        }
    };

    return (

        <div className="flex min-h-screen w-full font-inter overflow-hidden bg-white">
            <RegisterBanner />

            <FormProvider {...methods}>
                <RegisterWrapper
                    step={stepIndex + 1}
                    totalSteps={steps.length}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CurrentComponent />
                </RegisterWrapper>
            </FormProvider>
        </div>
    );
};

export default Register;