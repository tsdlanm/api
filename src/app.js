import express from 'express';
import cors from 'cors';
import approutes from './routes/approutes.js';

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api', approutes);

export default app;