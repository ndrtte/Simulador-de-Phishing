import axios from "axios";
import { Correo } from "../types/correo";

export const obtenerCorreos = async (
  dificultad: number,
  cantidad: number
): Promise<Correo[]> => {
  const response = await axios.get<Correo[]>(
    "http://localhost:8080/api/correos/obtener-correos",
    {
      params: { dificultad, cantidad },
    }
  );

  return response.data;
};