import express from 'express';
import dotenv from 'dotenv'
dotenv.config({path:'./config.env'});
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Servidor funcionando en http://localhost:${PORT}`))