require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>res.json({ok:true, message:'API Smiles Clínica Dental funcionando'}));
app.use('/api/pacientes', require('./routes/pacientes'));
app.use('/api/dentistas', require('./routes/dentistas'));
app.use('/api/citas', require('./routes/citas'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3000;

async function start() {
  const mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  console.log('MongoDB local temporal conectado');
  app.listen(PORT, () => console.log('Servidor en puerto ' + PORT));
}

start().catch(err => {
  console.error('Error MongoDB:', err.message);
  process.exit(1);
});