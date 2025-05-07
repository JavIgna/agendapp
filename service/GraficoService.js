import { AgendaMedica } from "../models/Agenda.js";
import mongoose from "mongoose";

export const citasPorMedico = async (filtros) => {
  const { fechaInicio, fechaFin, medicoId, especialidad } = filtros;

  const match = {};

  if (fechaInicio && fechaFin) {
    match.fecha = {
      $gte: new Date(fechaInicio),
      $lte: new Date(fechaFin),
    };
  }

  if (medicoId && mongoose.Types.ObjectId.isValid(medicoId))
    match.doctor = new mongoose.Types.ObjectId(medicoId); // este podria ser el posible causante
  if (especialidad) match.especialidad = especialidad;

  return await AgendaMedica.aggregate([
    { $match: match },
    { $unwind: "$bloques" },
    {
      $group: {
        _id: { doctor: "$doctor", estado: "$bloques.agendado" },
        total: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.doctor",
        estados: {
          $push: {
            estado: "$_id.estado",
            total: "$total",
          },
        },
        totalCitas: { $sum: "$total" },
      },
    },
    {
      $lookup: {
        from: "doctors",
        localField: "_id",
        foreignField: "_id",
        as: "doctor",
      },
    },
    {
      $unwind: "$doctor",
    },
    {
      $project: {
        nombre: "$doctor.nombreCompleto",
        totalCitas: 1,
        estados: 1,
      },
    },
  ]);
};
