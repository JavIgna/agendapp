import { Doctor } from "../models/Doctor.js";

export const crearDoctor = async (datos) => {
  const doctor = new Doctor(datos);
  return await doctor.save();
};

// TODO terminar crud
// Traer un medico en especifico con su agenda
// Traer medicos por especialidad con agenda