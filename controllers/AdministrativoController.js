import mongoose from "mongoose";
import { Usuario } from "../models/Usuario.js";
import { Administrativo } from "../models/Administrativo.js";
import {
  actualizarAdministrativo,
  obtenerAdministrativos,
  obtenerAdministrativoPorId,
} from "../service/AdministrativoService.js";

export const registrarAdministrativo = async (req, res) => {
  const sesion = await mongoose.startSession();
  sesion.startTransaction();

  try {
    const { correo, password, rut, nombreCompleto, especialidad } = req.body;

    const usuario = new Usuario({
      correo,
      password,
      rol: "administrativo",
    });

    // TODO revisar para no devolver el password al crear el usuario
    await usuario.save({ session: sesion });

    const administrativo = new Administrativo({
      rut,
      nombreCompleto,
      usuario: usuario._id,
    });

    await administrativo.save({ session: sesion });

    await sesion.commitTransaction();

    res.status(201).json({ administrativo, usuario });
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

export const listarAdministrativos = async (req, res) => {
  try {
    const administrativos = await obtenerAdministrativos();
    res.json(administrativos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editarAdministrativo = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = req.body;

    const administrativoActualizado = await actualizarAdministrativo(id, datos);

    res.json(administrativoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
