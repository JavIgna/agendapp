import mongoose from "mongoose";

// TODO agregar estado en bloques para desahabilitar un bloque
const esquemaAgendaMedica = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    bloques: [
      {
        hora: {
          type: Date,
          required: true,
        },
        agendado: {
          type: String,
          enum: ["Agendado", "Disponible", "Finalizado"],
          required: true,
          default: "Disponible",
        },
        confirmacion: {
          type: Boolean,
          default: false,
        },
        paciente: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Paciente",
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

export const AgendaMedica = mongoose.model("AgendaMedica", esquemaAgendaMedica);
