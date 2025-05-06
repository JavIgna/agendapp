import express from "express";
import { login, solicitarRecuperacion } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/auth/recuperar-password", solicitarRecuperacion);

export default router;
