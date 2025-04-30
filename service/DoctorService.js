import { Doctor } from "../models/Doctor.js";
import { AgendaMedica } from "../models/Agenda.js";

export const crearDoctor = async (datos) => {
  const doctor = new Doctor(datos);
  return await doctor.save();
};

export const obtenerDoctores = async () => {
  return await Doctor.find();
};

// Traer un medico en especifico con su agenda
export const obtenerDoctorPorId = async (id) => {
  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      throw new Error("Doctor no encontrado");
    }

    const agendas = await AgendaMedica.find({ doctor: id });

    return {
      doctor,
      agendas,
    };
  } catch (error) {
    throw new Error(`Error al obtener el doctor: ${error.message}`);
  }
};

//****** Actualiza Datos Doctor */

export const actualizarDoctor = async (id, datos) => {
  const doctor = await Doctor.findById(id);

  const { nombreCompleto, especialidad } = datos;

  if (!doctor) throw new Error("Doctor no encontrado");

  if (nombreCompleto) doctor.nombreCompleto = nombreCompleto;
  if (especialidad) doctor.especialidad = especialidad;

  return await doctor.save();
};

// Traer medicos por especialidad con agenda

export const obtenerDoctoresPorEspecialidadConAgenda = async (especialidad) => {
  try {
    // 1. Buscar doctores con esa especialidad
    const doctores = await Doctor.find({ especialidad: especialidad });

    // 2. Obtener los IDs de los doctores
    const idsDoctores = doctores.map((doc) => doc._id);
  } catch (error) {
    throw new Error(`Error al obtener doctores con agenda: ${error.message}`);
  }
};
