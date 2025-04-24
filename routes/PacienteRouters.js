import express from "express";
import { registrarPaciente } from "../controllers/PacienteController.js";

const router = express.Router();

router.post("/crear", registrarPaciente);

export default router;