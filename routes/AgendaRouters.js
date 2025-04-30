import express from "express";
import {
  agendar,
  confirmar,
  finalizar,
  generarAgenda,
  liberar,
  listarAgendas,
} from "../controllers/AgendaController.js";

const router = express.Router();

router.post("/crear", generarAgenda);
router.get("/listar", listarAgendas);

router.post("/agendar", agendar);
router.post("/confirmar", confirmar);
router.post("/liberar", liberar);
router.post("/finalizar", finalizar);

export default router;
