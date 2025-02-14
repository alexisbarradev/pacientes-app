export interface Patient {
    id?: number;
    apellidoPaterno: string;
    apellidoMaterno: string;
    primerNombre: string;
    segundoNombre?: string;
    rut: string;
    edad: number;
    telefono?: string;
    email?: string;
    fechaNacimiento: string; // Se maneja como string en formato ISO 8601
    genero: string;
    direccion?: string;
    comuna?: string;
    region?: string;
  }
  