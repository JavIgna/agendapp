import { Administrativo } from "../models/Administrativo.js";

export const crearAdministrativo = async (datos) => {
  const administrativo = new Administrativo(datos);
  return await administrativo.save();
};

export const obtenerAdministrativos = async () => {
  return await Administrativo.find();
};

export const obtenerAdministrativoPorId = async (id) => {
  try {
    const administrativo = await Administrativo.findById(id);

    if (!administrativo) {
      throw new Error("Usuario no encontrado");
    }

    return administrativo;
  } catch (error) {
    throw new Error(`Error al obtener el Administrativo: ${error.message}`);
  }
};

//****** Actualiza Datos Administrativo */

export const actualizarAdministrativo = async (id, datos) => {
  const administrativo = await Administrativo.findById(id);

  const { nombreCompleto } = datos;

  if (!administrativo) throw new Error("Usuario no encontrado");

  if (nombreCompleto) administrativo.nombreCompleto = nombreCompleto;

  return await administrativo.save();
};
