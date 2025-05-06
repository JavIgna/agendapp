import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";
import { generarToken } from "../utils/auth.js";
import { enviarCorreo } from "../utils/nodemailer.js";

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

export const solicitarRecuperacion = async (req, res) => {
  const { correo } = req.body;

  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }

  const token = generarToken(usuario, "15m");

  // Imaginamos que estamos enviando un link a un formulario en donde el token va anidado, esto es un ejemplo
  const link = `https//www.hospital.cl/restablecer-pasword?token=${token}`;

  await enviarCorreo({
    to: correo,
    subject: "Recuperación de contraseña",
    html: `
      <p>Haz click en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${link}">${link}</a>
      <p>Este enlace expirará en 15 minutos.</p>
    `,
  });

  res.json({ mensaje: "Se ha enviado un correo con las instrucciones" });
};