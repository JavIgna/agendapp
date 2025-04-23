import mongoose from "mongoose";
import { Usuario } from "../models/Usuario.js";
import { Doctor } from "../models/Doctor.js";

export const registrarDoctor = async (req, res) => {
  const sesion = await mongoose.startSession();
  sesion.startTransaction();

  try {
    const { correo, password, rut, nombreCompleto, especialidad } = req.body;

    const usuario = new Usuario({
      correo,
      password,
      rol: "doctor",
    });

    await usuario.save({ sesion });

    const doctor = new Doctor({
      rut,
      nombreCompleto,
      especialidad,
      usuario: usuario._id,
    });

    await doctor.save({ sesion });

    await sesion.commitTransaction();

    res.status(201).json({ doctor, usuario });
  } catch (error) {
    if (error.name === "ValidationError") {
      await sesion.abortTransaction();
      return res.status(400).json({
        error: "Error de validación",
        detalles: error.errors,
      });
    }

    await sesion.abortTransaction();

    res.status(500).json({ error: error.message });
  } finally {
    sesion.endSession();
  }
};
