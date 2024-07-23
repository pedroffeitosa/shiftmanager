import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctorRoutes';
import hospitalRoutes from './routes/hospitalRoutes';
import shiftRoutes from './routes/shiftRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3001', 'https://shiftmanager-jade.vercel.app'], // Adicione todas as URLs permitidas
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get('/test', (req, res) => {
  res.send('API is working!');
});

app.use('/doctors', doctorRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/shifts', shiftRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
