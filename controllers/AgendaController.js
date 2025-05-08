import mongoose from "mongoose";
import { AgendaMedica } from "../models/Agenda.js";
import {
  agendarBloque,
  confirmarBloque,
  desactivarBloque,
  finalizarBloque,
  liberarBloque,
  obtenerAgendas,
} from "../service/AgendaService.js";

export const generarAgenda = async (req, res) => {
  const sesion = await mongoose.startSession();
  sesion.startTransaction();

  try {
    const {
      doctorId,
      fechaInicio,
      fechaFin,
      horaInicio,
      horaFin,
      duracion,
      diasOmitir,
    } = req.body;

    // TODO mejorar esta lógica y trabajarla de la manera más limpia posibles
    if (
      !doctorId ||
      !fechaInicio ||
      !fechaFin ||
      !horaInicio ||
      !horaFin ||
      !duracion
    ) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const fechaInicial = new Date(fechaInicio);
    const fechaFinal = new Date(fechaFin);

    const agendasGeneradas = [];

    const [hInicio, mInicio] = horaInicio.split(":").map(Number);
    const [hFin, mFin] = horaFin.split(":").map(Number);

    for (
      let dia = new Date(fechaInicial);
      dia <= fechaFinal;
      dia.setDate(dia.getDate() + 1)
    ) {
      // domingo 0, lunes 1, martes 2, miercoles 3, jueves 4, viernes 5, sabado 6
      const diaSemana = dia.getDay();
      if (diasOmitir.includes(diaSemana)) continue;

      const bloques = [];

      const fechaBase = new Date(dia);

      const inicio = new Date(fechaBase);
      inicio.setUTCHours(hInicio, mInicio, 0, 0);

      const fin = new Date(fechaBase);
      fin.setUTCHours(hFin, mFin, 0, 0);

      for (
        let actual = new Date(inicio);
        actual < fin;
        actual = new Date(actual.getTime() + duracion * 60000)
      ) {
        bloques.push({
          hora: new Date(actual),
        });
      }

      const nuevaAgenda = new AgendaMedica({
        doctor: doctorId,
        fecha: fechaBase,
        bloques,
      });

      const agendaGuardada = await nuevaAgenda.save({ sesion });
      agendasGeneradas.push(agendaGuardada);
    }
    await sesion.commitTransaction();
    res
      .status(201)
      .json({ mensaje: "Agenda generadas", agendas: agendasGeneradas });
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
  }
};

export const listarAgendas = async (req, res) => {
  try {
    const agendas = await obtenerAgendas();
    res.json(agendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const agendar = async (req, res) => {
  try {
    const { agendaId, bloqueId, pacienteId } = req.body;

    const resultado = await agendarBloque(agendaId, bloqueId, pacienteId);

    res.json({ mensaje: "Hora agendada", resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmar = async (req, res) => {
  try {
    const { agendaId, bloqueId } = req.body;

    const resultado = await confirmarBloque(agendaId, bloqueId);

    res.json({ mensaje: "Hora confirmada", resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const liberar = async (req, res) => {
  try {
    const { agendaId, bloqueId } = req.body;

    const resultado = await liberarBloque(agendaId, bloqueId);

    res.json({ mensaje: "Hora liberada", resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const finalizar = async (req, res) => {
  try {
    const { agendaId, bloqueId } = req.body;

    const resultado = await finalizarBloque(agendaId, bloqueId);

    res.json({ mensaje: "Hora finalizada", resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const desactivar = async (req, res) => {
  try {
    const { agendaId, bloqueId } = req.body;

    const resultado = await desactivarBloque(agendaId, bloqueId);

    res.json({ mensaje: "Hora desactivada", resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};