export interface StudentRead {
  idLector: number;
  ci: string;
  nombre: string;
  direccion: string;
  carrera: string;
  edad: number;
}

export interface StudentWrite {
  ci: string;
  nombre: string;
  direccion: string;
  carrera: string;
  edad: number;
}