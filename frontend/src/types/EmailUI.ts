import { Correo } from "./correo";

export interface EmailUI extends Correo {
  isCustom?: boolean;
}