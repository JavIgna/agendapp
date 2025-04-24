import mongoose from "mongoose";
import { Usuario } from "../models/Usuario.js";
import { Doctor } from "../models/Doctor.js";
import { actualizarDoctor, obtenerDoctorPorId } from "../service/DoctorService.js";

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




export const verDoctorAgenda = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("Id de Doctor no válido");
    }

    const doctorAgenda = await obtenerDoctorPorId(id);

    if (!doctorAgenda) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(doctorAgenda);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const editarDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = req.body;

    const doctorActualizado = await actualizarDoctor(id, datos);

    res.json(doctorActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
