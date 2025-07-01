import { MedicalSpecialty } from "../enums/medical-specialty-enum";

export interface registerDoctorData {
  name: string;
  email: string;
  password: string;
  age: string;
  gender: string;
  address: string;
  specialty: MedicalSpecialty;
  sessionPrice? : number
}
