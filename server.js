import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import auth from './routes/auth.js';
import connectDB from './config/db.js';

//Connect Db
connectDB();

const app = express();
//Middleware
app.use(express.json());

//Ruta
app.use('/api/auth', auth);

//Puerto
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`));


//En caso de error en procesos
process.on("unhandledRejection", (err,promise)=>{
    console.log(`Logged Error: ${err}`);
    server.close(()=>process.exit(1))
});
