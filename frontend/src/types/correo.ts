export interface Correo {
  idCorreo: number;
  nombreRemitente: string;
  correoRemitente: string;
  asunto: string;
  cuerpoCorreo: string;
  esPhishing: number;

  dificultad: {
    idDificultad: number;
    dificultad: string;
  };
}