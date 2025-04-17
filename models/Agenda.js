import mongoose from "mongoose";
import Doctor from "Doctor.js";
import Paciente from "Paciente.js";

const esquemaAgendaMedica = new mongoose.Schema(
  {

Agenda: {
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
    unique: true,
  },
  fecha : 
  {
    type:Date,
     require:true
  },
  bloques:[
    {
      hora : 
      {
        type:Date,
         require:true 
      },
      agendado : {
        type:String,
        enum :["Agendado","Disponible"],
        required:true,
      },
      paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paciente",
        required: true,
        unique: true,
      },
    }
  ]
}


},
{ timestamps: true }
);

export const AgendaMedica = mongoose.model("AgendaMédica", esquemaAgendaMedica);

