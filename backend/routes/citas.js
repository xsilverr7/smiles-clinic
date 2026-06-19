const router = require('express').Router();
const Cita = require('../models/Cita');
function pop(q){ return q.populate('paciente').populate('dentista'); }
router.post('/', async (req,res)=>{ try{ res.status(201).json(await Cita.create(req.body)); }catch(e){res.status(400).json({error:e.message});} });
router.get('/', async (req,res)=>{ res.json(await pop(Cita.find().sort({fecha:1,hora:1}))); });
router.get('/dia/:fecha', async (req,res)=>{ res.json(await pop(Cita.find({fecha:req.params.fecha}).sort({hora:1}))); });
router.get('/canceladas', async (req,res)=>{ res.json(await pop(Cita.find({estado:'Cancelada'}).sort({fecha:-1}))); });
router.get('/por-dentista', async (req,res)=>{ res.json(await Cita.aggregate([{$group:{_id:'$dentista',total:{$sum:1}}},{$lookup:{from:'dentistas',localField:'_id',foreignField:'_id',as:'dentista'}},{$unwind:'$dentista'},{$project:{_id:0,dentista:'$dentista.nombre',total:1}}])); });
router.get('/por-especialidad/:especialidad', async (req,res)=>{ const Cita=require('../models/Cita'); res.json(await Cita.find().populate('paciente').populate({path:'dentista',match:{especialidad:req.params.especialidad}}).then(x=>x.filter(c=>c.dentista))); });
router.put('/:id', async (req,res)=>{ try{ res.json(await Cita.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})); }catch(e){res.status(400).json({error:e.message});} });
router.patch('/:id/estado', async (req,res)=>{ res.json(await Cita.findByIdAndUpdate(req.params.id,{estado:req.body.estado},{new:true})); });
router.delete('/:id', async (req,res)=>{ res.json(await Cita.findByIdAndUpdate(req.params.id,{estado:'Cancelada'},{new:true})); });
module.exports = router;
