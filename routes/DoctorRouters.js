import express from "express";
import {
  registrarDoctor,
  editarDoctor,
  verDoctorAgenda,
  listarDoctores,
} from "../controllers/DoctorController.js";
import { soloAdmin, verificarAuth } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/crear", verificarAuth, soloAdmin, registrarDoctor);
router.get("/listar", listarDoctores);
router.put("/actualizar/:id", editarDoctor);
router.get("/buscarDoctorAgenda/:id", verDoctorAgenda);

export default router;
