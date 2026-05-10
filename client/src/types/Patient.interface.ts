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


export interface RegisterFormPersonal {
  age: number;
  gender: string;
  height?: number;
  weight?: number;
  bloodGroup: BloodGroupType
}