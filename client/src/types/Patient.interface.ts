export const BloodGroup = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
} as const;

// ✅ Correct type extraction
export type BloodGroupType =
  typeof BloodGroup[keyof typeof BloodGroup];


export type RegisterFormForPateint = {
  gender: "" | "Male" | "Female" | "Other";
  dob: string;
  height: number;
  weight: number;
  heightUnit: "cm" | "in";
  weightUnit: "kg" | "lb";
  bloodGroup: BloodGroupType;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country?: string;
  latitude: number;
  longitude: number;
  emergencyContactName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  allergies?: string[];
  medicalHistory?: string[];
  currentMedicines?: string[];
  smoke: boolean;
  alcohol: boolean;
  exercise: "Daily" | "Weekly" | "Occasionally" | "Rarely";
  agreedToDisclaimer: boolean;
  preferredLanguage: string;
  profilePicture: string | File;
}


export interface CreatePatientPayload {
  dob: Date;
  gender: "Male" | "Female" | "Other";
  preferredLanguage: string;
  bloodGroup: BloodGroupType;

  height: { value: number; unit: string }; // cm
  weight: { value: number; unit: string }; // kg

  location: {
    address: string;
    pincode: string;
    city: string;
    state: string;
    country?: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  allergies: string[];
  medicalHistory: string[];
  currentMedicines: string[];
  lifestyle: {
    smoking: boolean;
    alcohol: boolean;
    exercise: string;
  };
}

export interface CreatePatientResponse {
  success: boolean,
  message: string,
  patient: CreatePatientPayload
}