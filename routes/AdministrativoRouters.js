import express from "express";
import {
  registrarAdministrativo,
  editarAdministrativo,
  listarAdministrativos,
} from "../controllers/AdministrativoController.js";
import { soloAdmin, verificarAuth } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/crear", verificarAuth, soloAdmin, registrarAdministrativo);
router.get("/listar", listarAdministrativos);
router.put("/actualizar/:id", editarAdministrativo);

export default router;
