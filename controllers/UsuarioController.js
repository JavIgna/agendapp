import {
  crearUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
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

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    // Por defecto res.json devuelve code 200
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verUsuario = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("Id de usuario no válido");
    }

    const usuario = await obtenerUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = req.body;

    const usuarioActualizado = await actualizarUsuario(id, datos);

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TODO cambiar el eliminar por desactivar paciente
export const borrarUsuario = async (req, res) => {
  try {
    const id = req.params.id;

    const usuarioEliminado = await eliminarUsuario(id);

    res.json({ mensaje: "Usuario eliminado", usuario: usuarioEliminado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
