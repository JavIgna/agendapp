import { verificarToken } from "../utils/auth.js";

export const verificarAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.splith(" ")[1];

  try {
    const payload = verificarToken(token);

    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
