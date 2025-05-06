import express from "express";
import {
  login,
  restablecerPassword,
  solicitarRecuperacion,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/auth/recuperar-password", solicitarRecuperacion);
router.post("/auth/restablecer-password", restablecerPassword);

export default router;
