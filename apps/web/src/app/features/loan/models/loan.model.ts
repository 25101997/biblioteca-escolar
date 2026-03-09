export interface PrestamoDetalle {
  idLector: number;
  nombreEstudiante: string;
  idLibro: number;
  tituloLibro: string;
  nombreAutor: string;
  fechaPrestamo: string;
  fechaDevolucion?: string | null;
  devuelto: boolean;
}

export interface PrestamoTop5 {
  nombreEstudiante: string;
  tituloLibro: string;
  nombreAutor: string;
  fechaPrestamo: string;
  fechaDevolucion?: string | null;
  devuelto: boolean;
}

export interface PrestamoCreate {
  idLector: number;
  idLibro: number;
  fechaPrestamo: string;
  fechaDevolucion?: string | null;
  devuelto: boolean;
}

export interface PrestamoUpdate {
  idLectorOriginal: number;
  idLibroOriginal: number;
  fechaPrestamoOriginal: string;

  idLectorNuevo: number;
  idLibroNuevo: number;
  fechaPrestamoNueva: string;
  fechaDevolucion?: string | null;
  devuelto: boolean;
}