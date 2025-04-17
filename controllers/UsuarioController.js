import {
  crearUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
} from "../service/UsuarioService.js";

export const registrarUsuario = async (req, res) => {
  try {
    const datos = req.body;

    if (!datos.correo || !datos.password || !datos.rol) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const nuevoUsuario = await crearUsuario(datos);

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
