import express from "express";
import { generarAgenda } from "../controllers/AgendaController.js";

const router = express.Router();

router.post("/crear", generarAgenda);

export default router;
