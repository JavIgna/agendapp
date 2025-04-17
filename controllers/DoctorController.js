import mongoose from "mongoose";
import { crearDoctor } from "../service/DoctorService.js";

export const registrarDoctor = async (req, res) => {
  const sesion = await mongoose.startSession();
  sesion.startTransaction();

  try {
    const { correo, password, rut, nombreCompleto, especialidad } = req.body;

    // TODO Probar como afecta el res en caso de no cerrar sesión.
    if ((!correo || !password || !rut || !nombreCompleto, !especialidad)) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

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
    sesion.endSession();

    res.status(201).json({ doctor, usuario });
  } catch (error) {
    await sesion.abortTransaction();
    sesion.endSession();

    res.status(500).json({ error: error.message });
  }
};
