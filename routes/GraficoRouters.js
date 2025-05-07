import express from "express";
import { obtenerCitasPorMedico } from "../controllers/GraficoController.js";

const router = express.Router();

router.get("/citas-por-doctor", obtenerCitasPorMedico);

export default router;
