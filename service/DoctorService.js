import { Doctor } from "../models/Doctor.js";

export const crearDoctor = async (datos) => {
  const doctor = new Doctor(datos);
  return await doctor.save();
};
