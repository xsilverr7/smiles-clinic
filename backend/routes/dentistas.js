const router = require('express').Router();
const Dentista = require('../models/Dentista');
router.post('/', async (req,res)=>{ try{ res.status(201).json(await Dentista.create(req.body)); }catch(e){res.status(400).json({error:e.message});} });
router.get('/', async (req,res)=>{ res.json(await Dentista.find().sort({createdAt:-1})); });
router.put('/:id', async (req,res)=>{ try{ res.json(await Dentista.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})); }catch(e){res.status(400).json({error:e.message});} });
router.delete('/:id', async (req,res)=>{ await Dentista.findByIdAndDelete(req.params.id); res.json({mensaje:'Dentista eliminado'}); });
module.exports = router;
