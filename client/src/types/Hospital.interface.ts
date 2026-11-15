export interface RegisterFormForHospital {
  hospitalName: string;
  hospitalType: string;
  registrationNumber: string;
  establishedYear: number;
  description: string;

  phones: { value: string }[];
  emergencyPhone: string;
  email: string;
  website: string;

  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;

  departments: { name: string; description: string }[];
  specialties: { value: string }[];
  facilities: { value: string }[];
  services: { value: string }[];

  pharmacyAvailable: boolean;
  bloodBankAvailable: boolean;

  bedTotal: number;
  bedAvailable: number;
  icuTotal: number;
  icuAvailable: number;
  ventilatorTotal: number;
  ventilatorAvailable: number;
}
