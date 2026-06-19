const router = require('express').Router();
const Paciente = require('../models/Paciente');
router.post('/', async (req,res)=>{ try{ res.status(201).json(await Paciente.create(req.body)); }catch(e){res.status(400).json({error:e.message});} });
router.get('/', async (req,res)=>{ res.json(await Paciente.find().sort({createdAt:-1})); });
router.get('/recientes', async (req,res)=>{ res.json(await Paciente.find().sort({fechaRegistro:-1}).limit(10)); });
router.put('/:id', async (req,res)=>{ try{ res.json(await Paciente.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})); }catch(e){res.status(400).json({error:e.message});} });
router.delete('/:id', async (req,res)=>{ await Paciente.findByIdAndDelete(req.params.id); res.json({mensaje:'Paciente eliminado'}); });
module.exports = router;
