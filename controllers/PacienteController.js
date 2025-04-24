import mongoose from "mongoose";
import {
  actualizarPaciente,
  crearPaciente,
  eliminarPaciente,
  obtenerPacientePorId,
  obtenerPacientes
} from "../service/PacienteService.js";

export const registrarPaciente = async (req, res) => {
  const sesion = await mongoose.startSession();
  sesion.startTransaction();

  try {
    const datos = req.body;

    if (!datos.rut || !datos.nombreCompleto || !datos.genero || !datos.fNacimiento || !datos.direccion || !datos.comuna) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const nuevoPaciente = await crearPaciente(datos);

    res.status(201).json(nuevoPaciente)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const listarPacientes = async (req, res) => {
  try {
    const pacientes = await obtenerPacientes();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const verPaciente = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("El ID del paciente no es válido");
    }

    const paciente = await obtenerPacientePorId(id);

    if (!paciente) {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    res.json(paciente)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const editarPaciente = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = req.body;

    const pacienteActualizado = await actualizarPaciente(id, datos);

    res.json(pacienteActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const borrarPaciente = async (req, res) => {
  try {
    const id = req.params.id;

    const pacienteEliminado = await eliminarPaciente(id);

    res.json({ mensaje: "Paciente eliminado", paciente: pacienteEliminado })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}