const mongoose = require('mongoose');
const DentistaSchema = new mongoose.Schema({
  nombre:{type:String,required:true}, especialidad:{type:String,required:true}, telefono:{type:String,required:true},
  correo:{type:String,required:true}, horarioAtencion:{type:String,required:true}
},{timestamps:true});
module.exports = mongoose.model('Dentista', DentistaSchema);
