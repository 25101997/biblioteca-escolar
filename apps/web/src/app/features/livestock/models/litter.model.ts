import { AnimalRead } from "./animal.model";

export interface LitterRead {
  id: number;
  mother?: AnimalRead;
  father?: AnimalRead;
  bornMale: number;
  bornFemale: number;
  abortedMale: number;
  abortedFemale: number;
  totalBorn: number;
  status: string;
  notes: string;
  updated: string;
  created: string;
}

export interface LitterWrite {
  motherId: number;
  fatherId: number;
  bornMale: number;
  bornFemale: number;
  abortedMale: number;
  abortedFemale: number;
  status: string;
  notes: string;
}

export interface LitterUpdate {
  id: number;
  motherId: number;
  fatherId: number;
  bornMale: number;
  bornFemale: number;
  abortedMale: number;
  abortedFemale: number;
  status: string;
  notes: string;
}
