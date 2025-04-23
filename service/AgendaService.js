import { Agenda } from "../models/Agenda.js";

export const crearAgenda = async (datos) => {
  const agenda = new Agenda(datos);
  return await agenda.save();
};
