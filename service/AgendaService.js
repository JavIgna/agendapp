import { AgendaMedica } from "../models/Agenda.js";

export const crearAgenda = async (datos) => {
  const agenda = new AgendaMedica(datos);
  return await agenda.save();
};

export const obtenerAgendas = async () => {
  return await AgendaMedica.find()
    .populate("doctor", "especialidad") // acá traigo solo la especialidad del doctor
    .populate("bloques.paciente");
};

export const agendarBloque = async (agendaId, bloqueId, pacienteId) => {
  const agenda = await AgendaMedica.findById(agendaId);

  if (!agenda) throw new Error("Agenda no encontrada");

  const bloque = agenda.bloques.id(bloqueId);

  if (!bloque || bloque.agendado !== "Disponible")
    throw new Error("Bloque no válido o no disponible");

  bloque.agendado = "Agendado";
  bloque.paciente = pacienteId;

  return await agenda.save();
};

export const confirmarBloque = async (agendaId, bloqueId) => {
  const agenda = await AgendaMedica.findById(agendaId);

  if (!agenda) throw new Error("Agenda no encontrada");

  const bloque = agenda.bloques.id(bloqueId);

  if (!bloque || bloque.agendado !== "Agendado")
    throw new Error("Bloque no confirmado");

  bloque.confirmacion = true;

  return await agenda.save();
};

// findByIdAndUpdate()
// findOneAndUpdate() Esto es más directo, es más rápida y no cargo
/* AgendaMedica.findOneAndUpdate(
  { _id: agendaId, "bloques._id": bloqueId },
  {
    $set: {
      "bloques.$.agendado": "Disponible",
      "bloques.$.confirmacion": false,
      "bloques.$.paciente": null,
    },
  },
  { new: true }
); */

export const liberarBloque = async (agendaId, bloqueId) => {
  const agenda = await AgendaMedica.findById(agendaId);

  if (!agenda) throw new Error("Agenda no encontrada");

  const bloque = agenda.bloques.id(bloqueId);

  if (!bloque || bloque.agendado === "Disponible")
    throw new Error("Bloque no agendado");

  if (bloque.agendado === "Finalizado") throw new Error("Bloque finalizado");

  bloque.agendado = "Disponible";
  bloque.confirmacion = false;
  bloque.paciente = null;

  return await agenda.save();
};

export const finalizarBloque = async (agendaId, bloqueId) => {
  const agenda = await AgendaMedica.findById(agendaId);

  if (!agenda) throw new Error("Agenda no encontrada");

  const bloque = agenda.bloques.id(bloqueId);

  if (!bloque || bloque.agendado !== "Agendado")
    throw new Error("Bloque no agendado");

  bloque.agendado = "Finalizado";

  return await agenda.save();
};

// En caso de querer hacer un update en campos especificos, podemos utilizar
// findByIdAndUpdate({_id: id}, {nombre: "Nuevo Nombre"})
