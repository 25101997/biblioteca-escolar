export interface AnimalOrigin {
  id: number;
  name: string;
}

export interface AnimalStatus {
  id: number;
  name: string;
}

export interface AnimalStage {
  id: number;
  name: string;
}

export interface AnimalRead {
  id: number;
  origin?: AnimalOrigin;
  status?: AnimalStatus;
  stage?: AnimalStage;
  breed: string;
  sex: string;
  weight: number;
  birthDate: string;      // Angular lo trata como string ISO
  created: string;
  updated: string;
}

export interface AnimalWrite {
  originId: number;
  statusId: number;
  stageId: number;
  litterId: number;
  weight: number;
  sex: string;
  breed: string;
  birthDate: string
}

export interface AnimalUpdate {
  id: number;
  originId: number;
  statusId: number;
  stageId: number;
  weight: number;
  sex: string;
  breed: string;
  birthDate: string;
}
