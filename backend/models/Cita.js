const mongoose = require('mongoose');
const CitaSchema = new mongoose.Schema({
  paciente:{type:mongoose.Schema.Types.ObjectId,ref:'Paciente',required:true},
  dentista:{type:mongoose.Schema.Types.ObjectId,ref:'Dentista',required:true},
  fecha:{type:String,required:true}, hora:{type:String,required:true}, motivo:{type:String,required:true},
  estado:{type:String,enum:['Programada','Confirmada','Atendida','Cancelada'],default:'Programada'}
},{timestamps:true});
module.exports = mongoose.model('Cita', CitaSchema);
