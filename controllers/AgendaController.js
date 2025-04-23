import mongoose from "mongoose";
import { AgendaMedica } from "../models/Agenda";

export const generarAgenda = async (req, res) => {
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
    if (!fechaInicio || !fechaFin || !horaInicio || !horaFin || !duracion) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const fechaInicial = new Date(fechaInicio);
    const fechaFinal = new Date(fechaFin);

    const agendasGeneradas = [];

    for (
      let dia = new Date(fechaInicial);
      dia <= fechaFinal;
      dia.setDate(dia.getDate() + 1)
    ) {
      // domingo 0, lunes 1, martes 2, miercoles 3, jueves 4, viernes 5, sabado 6
      const diaSemana = dia.getDay();
      if (diasOmitir.includes(diaSemana)) continue;

      const bloques = [];

      const fechaBase = new Date(dia.toDateString()); // fecha a las 00:00

      const [hInicio, mInicio] = horaInicio.split(":").map(Number);
      const [hFin, mFin] = horaFin.split(":").map(Number);

      const inicio = new Date(fechaBase);
      inicio.setHours(hInicio, mInicio, 0, 0);

      const fin = new Date(fechaBase);
      fin.setDate(hFin, mFin, 0, 0);

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
        fecha: new Date(fechaBase),
        bloques,
      });

      const agendaGuardada = nuevaAgenda.save();
      agendasGeneradas.push(agendaGuardada);

      res
        .status(201)
        .json({ mensaje: "Agenda generadas", agendas: agendasGeneradas });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
