import express from "express";
import { registrarDoctor } from "../controllers/DoctorController.js";

const router = express.Router();

router.post("/crear",registrarDoctor);

export default router;

