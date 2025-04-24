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

export const actualizarUsuario = async (id, datos) => {
  const usuario = await Usuario.findById(id);

  const { password, correo, rol } = datos;

  if (!usuario) throw new Error("Usuario no encontrado");

  if (password) usuario.password = password;

  if (correo) usuario.correo = correo;

  if (rol) usuario.rol = rol;

  return await usuario.save();
};

export const eliminarUsuario = async (id) => {
  const usuario = await Usuario.findById(id)

  if (!usuario) throw new Error("Usuario no encontrado");

  return await usuario.deleteOne()
}
