import { Usuario } from "../models/Usuario.js";

export const crearUsuario = async (datos) => {
  const usuario = new Usuario(datos);
  return await usuario.save();
};

export const obtenerUsuarios = async () => {
  return await Usuario.find();
};

export const obtenerUsuarioPorId = async (id) => {
  return await Usuario.findById(id);
};

// TODO terminar crud
