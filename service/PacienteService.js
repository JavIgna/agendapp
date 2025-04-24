import { Paciente } from "../models/Paciente.js";

export const crearPaciente = async (datos) => {
  const paciente = new Paciente(datos)
  return await paciente.save();
}