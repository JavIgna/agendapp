import { Paciente } from "../models/Paciente.js";

export const crearPaciente = async (datos) => {
  const paciente = new Paciente(datos)
  return await paciente.save();
}

export const obtenerPacientes = async () => {
  return await Paciente.find();
}

export const obtenerPacientePorId = async (id) => {
  return await Paciente.findById(id);
}

export const actualizarPaciente = async (id, datos) => {
  const paciente = await Paciente.findById(id);

  const {
    nombreCompleto,
    genero, 
    direccion, 
    comuna, 
    telefono, 
    correo 
  } = datos;

  if(!paciente) throw new Error("Paciente no encontrado");

  if(nombreCompleto) paciente.nombreCompleto = nombreCompleto;
  if(genero) paciente.genero = genero;
  if(direccion) paciente.direccion = direccion;
  if(comuna) paciente.comuna = comuna;
  if(telefono) paciente.telefono = telefono;
  if(correo) paciente.correo = correo;

  return await paciente.save();
}

export const eliminarPaciente = async (id) => {
  const paciente = await Paciente.findById(id);

  if(!paciente) throw new Error("Paciente no encontrado");

  return await paciente.deleteOne();
}