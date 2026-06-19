const router = require('express').Router();
const Paciente = require('../models/Paciente'); const Dentista = require('../models/Dentista'); const Cita = require('../models/Cita');
router.get('/resumen', async (req,res)=>{
  const [pacientes,dentistas,citasProgramadas,citasCanceladas,proximas] = await Promise.all([
    Paciente.countDocuments(), Dentista.countDocuments(), Cita.countDocuments({estado:{$in:['Programada','Confirmada']}}),
    Cita.countDocuments({estado:'Cancelada'}), Cita.find({fecha:new Date().toISOString().slice(0,10)}).populate('paciente').populate('dentista').sort({hora:1}).limit(10)
  ]);
  res.json({pacientes,dentistas,citasProgramadas,citasCanceladas,proximas});
});
module.exports = router;
