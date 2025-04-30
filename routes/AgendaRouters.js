import express from "express";
import {
  agendar,
  confirmar,
  generarAgenda,
  listarAgendas,
} from "../controllers/AgendaController.js";

const router = express.Router();

router.post("/crear", generarAgenda);
router.get("/listar", listarAgendas);

router.post("/agendar", agendar);
router.post("/confirmar", confirmar);

export default router;
