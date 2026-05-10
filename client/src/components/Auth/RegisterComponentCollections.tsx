import type { RegisterForm } from "../../types/Auth.interface";
import StepAccount from "./StepAccount";
import StepAddress from "./StepAddress";
import StepMedical from "./StepMedical";
import StepPersonal from "./StepPersonal";
import { StepRoles } from "./StepRoles";
import StepDoctorInfo from "./StepDoctorInfo";
import StepHospitalInfo from "./StepHospitalInfo";
import StepPharmacyInfo from "./StepPharmacyInfo";

export const stepConfigByRole: Record<
  string,
  {
    label: string;
    component: React.FC;
    fields: (keyof RegisterForm)[];
  }[]
> = {
  Patient: [
    { label: "Account", component: StepAccount, fields: ["fullName", "email", "mobile", "password"] },
    { label: "Role", component: StepRoles, fields: ["role"] },
    { label: "Personal", component: StepPersonal, fields: ["age", "gender", "bloodGroup", "height", "weight"] },
    { label: "Medical", component: StepMedical, fields: ["allergies", "medicalHistory", "currentMedicines"] },
    { label: "Address", component: StepAddress, fields: ["street", "city", "state", "pincode", "country", "latitude", "longitude"] }
  ],

  Doctor: [
    { label: "Account", component: StepAccount, fields: ["fullName", "email", "mobile", "password"] },
    { label: "Role", component: StepRoles, fields: ["role"] },
    { label: "Professional", component: StepDoctorInfo, fields: ["specialization", "licenseNumber", "experience"] },
    { label: "Personal", component: StepPersonal, fields: ["age", "gender", "bloodGroup", "height", "weight"] },
  ],

  Clinic: [
    { label: "Account", component: StepAccount, fields: ["fullName", "email", "mobile", "password"] },
    { label: "Role", component: StepRoles, fields: ["role"] },
    { label: "Address", component: StepAddress, fields: ["street", "city", "state", "pincode", "country", "latitude", "longitude"] }
  ],

  Hospital: [
    { label: "Account", component: StepAccount, fields: ["fullName", "email", "mobile", "password"] },
    { label: "Role", component: StepRoles, fields: ["role"] },
    { label: "Information", component: StepHospitalInfo, fields: ["hospitalName", "hospitalType", "licenseNumber"] },
    { label: "Address", component: StepAddress, fields: ["street", "city", "state", "pincode", "country", "latitude", "longitude"] }
  ],

  Pharmacy: [
    { label: "Account", component: StepAccount, fields: ["fullName", "email", "mobile", "password"] },
    { label: "Role", component: StepRoles, fields: ["role"] },
    { label: "Information", component: StepPharmacyInfo, fields: ["pharmacyName", "licenseNumber", "deliveryAvailable"] },
    { label: "Address", component: StepAddress, fields: ["street", "city", "state", "pincode", "country", "latitude", "longitude"] }
  ]
};