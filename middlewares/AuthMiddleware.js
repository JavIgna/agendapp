import { verificarToken } from "../utils/auth.js";

export const verificarAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verificarToken(token);

    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export const soloAdmin = (req, res, next) => {
  if (req.usuario?.rol !== "admin") {
    return res
      .status(403)
      .json({ error: "Acceso denegado: solo administradores" });
  }
  next();
};

// TODO agregar middleware para verificar si el usuario es Administrativo
// TODO agregar middleware para verificar si el usuario es Doctor (es para que los medicos solo puedan ver sus propias agendas)