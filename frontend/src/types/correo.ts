export interface Correo {
  idCorreo: number;
  nombreRemitente: string;
  correoRemitente: string;
  asunto: string;
  esPhishing: number;
  cuerpoCorreo: string;
  dificultad: number;
}