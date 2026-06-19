require('dotenv').config();
const mongoose = require('mongoose');
const Paciente = require('./models/Paciente');
const Dentista = require('./models/Dentista');
const Cita = require('./models/Cita');
(async()=>{
 await mongoose.connect(process.env.MONGODB_URI);
 await Promise.all([Paciente.deleteMany(),Dentista.deleteMany(),Cita.deleteMany()]);
 const pacientes = await Paciente.insertMany([
  {nombreCompleto:'Juan Perez Lopez',edad:25,telefono:'6671234567',correo:'juan@mail.com',direccion:'Centro, Culiacan'},
  {nombreCompleto:'Maria Gonzalez Ruiz',edad:31,telefono:'6679876543',correo:'maria@mail.com',direccion:'Tres Rios, Culiacan'}
 ]);
 const dentistas = await Dentista.insertMany([
  {nombre:'Dra. Ana Torres',especialidad:'Ortodoncia',telefono:'6671112233',correo:'ana@smiles.com',horarioAtencion:'Lunes a Viernes 9:00-15:00'},
  {nombre:'Dr. Carlos Medina',especialidad:'Endodoncia',telefono:'6674445566',correo:'carlos@smiles.com',horarioAtencion:'Lunes a Viernes 12:00-18:00'}
 ]);
 await Cita.insertMany([
  {paciente:pacientes[0]._id,dentista:dentistas[0]._id,fecha:new Date().toISOString().slice(0,10),hora:'10:00',motivo:'Revision general',estado:'Programada'},
  {paciente:pacientes[1]._id,dentista:dentistas[1]._id,fecha:new Date().toISOString().slice(0,10),hora:'12:00',motivo:'Dolor dental',estado:'Confirmada'}
 ]);
 console.log('Datos de prueba insertados'); await mongoose.disconnect();
})();
