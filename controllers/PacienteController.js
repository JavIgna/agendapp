import mongoose from "mongoose";
import { crearPaciente } from "../service/PacienteService.js";

export const registrarPaciente = async (req, res) => {
  const sesion = await mongoose.startSession();
  sesion.startTransaction();

  try {
    const datos = req.body;

    if(!datos.rut || !datos.nombreCompleto || !datos.genero || !datos.fNacimiento || !datos.direccion || !datos.comuna){
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const nuevoPaciente = await crearPaciente(datos);

    res.status(201).json(nuevoPaciente)
  } catch (error) {
    
  }
}