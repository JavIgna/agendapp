import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";
import { generarToken } from "../utils/auth.js";

export const login = async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res
      .status(400)
      .json({ error: "Correo y contraseña son obligatorios" });
  }

  const usuario = await Usuario.findOne({ correo }).select("+password");

  if (!usuario)
    return res.status(401).json({ error: "Credenciales inválidas" });

  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido)
    return res.status(401).json({ error: "Credenciales inválidas" });

  const token = generarToken(usuario);

  res.json({
    token,
    usuario: { id: usuario._id, correo: usuario.correo, rol: usuario.rol },
  });
};
