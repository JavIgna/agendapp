import { citasPorMedico } from "../service/GraficoService.js";

export const obtenerCitasPorMedico = async (req, res) => {
  try {
    const data = await citasPorMedico(req.query);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener citas por doctor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
