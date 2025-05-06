import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generarToken = (usuario, duracion = "2h") => {
  const payload = {
    id: usuario._id,
    correo: usuario.correo,
    rol: usuario.rol,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: duracion });
};

export const verificarToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
