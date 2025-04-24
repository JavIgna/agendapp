import express from "express";
import {
  borrarPaciente,
  editarPaciente,
  listarPacientes,
  registrarPaciente,
  verPaciente
} from "../controllers/PacienteController.js";

const router = express.Router();

router.post("/crear", registrarPaciente);
router.get("/listar", listarPacientes);
router.get("/ver/:id", verPaciente);
router.put("/actualizar/:id", editarPaciente);
router.delete("/eliminar/:id", borrarPaciente);

export default router;