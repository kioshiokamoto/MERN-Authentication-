import express from 'express';
import dotenv from 'dotenv';
import auth from './routes/auth.js';

dotenv.config({ path: './config.env' });

const app = express();
//Middleware
app.use(express.json());

app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`));
