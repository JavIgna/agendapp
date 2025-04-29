import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generarToken = (usuario) => {
  const payload = {
    id: usuario._id,
    correo: usuario.correo,
    rol: usuario.rol,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
};

export const verificarToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
