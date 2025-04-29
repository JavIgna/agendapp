import express from "express";
import {
  registrarDoctor,
  editarDoctor,
  verDoctorAgenda,
} from "../controllers/DoctorController.js";
import { verificarAuth } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/crear", verificarAuth, registrarDoctor);
router.put("/actualizar/:id", editarDoctor);
router.get("/buscarDoctorAgenda/:id", verDoctorAgenda);

export default router;
