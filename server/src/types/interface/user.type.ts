export enum UserRole {
  PATIENT = "patient",
  DOCTOR = "doctor",
  ADMIN = "admin",        // clinic/hospital admin
  PHARMACIST = "pharmacist",
  CLINIC_ADMIN = "clinic_admin",
  HOSPITAL_ADMIN = "hospital_admin",
};
export interface IUser extends Document {
  _id?: string | undefined;
  name: string;
  mobile: number;
  password: string;
  role: UserRole;
  profileCompleted: boolean;
}
