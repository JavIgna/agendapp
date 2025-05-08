import mongoose from "mongoose";
import bcrypt from "bcrypt";

// TODO agrega estado, para que el usuario pueda estar inactivo o activo y no tener que eliminarlo
const esquemaUsuario = new mongoose.Schema(
  {
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    rol: {
      type: String,
      enum: ["admin", "doctor", "administrativo"],
      required: true,
    },
    estado: {
      type : String,
      enum : ["activo","Inactivo"],
      required :true,
    }
  },
  { timestamps: true }
);

esquemaUsuario.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const textoAleatorio = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, textoAleatorio);
  next();
});

// agregando comentario a modelo Usuario
export const Usuario = mongoose.model("Usuario", esquemaUsuario);
