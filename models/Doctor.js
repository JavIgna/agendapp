import mongoose from "mongoose";

const esquemaDoctor = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      unique: true,
    },
    rut: {
      type: String,
      required: [true, "El Rut es Obligatorio"],
      unique: true,
      trim: true,
    },
    nombreCompleto: {
      type: String,
      required: [true, "El Nombre es Obligatorio"],
    },
    especialidad: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", esquemaDoctor);
