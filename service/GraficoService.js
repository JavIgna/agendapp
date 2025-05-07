import { AgendaMedica } from "../models/Agenda.js";

export const citasPorMedico = async (filtros) => {
  const { fechaInicio, fechaFin, medicoId, especialidad } = filtros;

  const match = {};

  if (fechaInicio && fechaFin) {
    match.fecha = {
      $gte: new Date(fechaInicio),
      $lte: new Date(fechaFin),
    };
  }

  if (medicoId) match.doctor = new ObjectId(medico); // este podria ser el posible causante
  if (especialidad) match.especialidad = especialidad;

  return await AgendaMedica.aggregate([
    { $match: match },
    { $group: { _id: "$doctor", totalCitas: { $sum: { $size: "$bloques" } } } },
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
      },
    },
  ]);
};
