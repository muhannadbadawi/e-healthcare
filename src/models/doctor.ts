import { MedicalSpecialty } from "../enums/medical-specialty-enum";

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  age: string;
  gender: string;
  address: string;
  specialty: MedicalSpecialty;
  rate: number;
}