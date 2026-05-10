export enum UserRole {
  PATIENT = "patient",
  DOCTOR = "doctor",
  ADMIN = "admin",        // clinic/hospital admin
  PHARMACY = "pharmacy",
  CLINIC_ADMIN = "clinic_admin",
  HOSPITAL_ADMIN = "hospital_admin",
};
export interface IUser extends Document {
  _id?:string
  name: string;
  email: string;
  mobile: number;
  password: string;
  role: UserRole;
}
