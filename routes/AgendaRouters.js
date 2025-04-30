import express from "express";
import {
  agendar,
  generarAgenda,
  listarAgendas,
} from "../controllers/AgendaController.js";

const router = express.Router();

router.post("/crear", generarAgenda);
router.get("/listar", listarAgendas);

router.post("/agendar", agendar);

export default router;
