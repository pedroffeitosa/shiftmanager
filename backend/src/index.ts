import express from 'express';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes';
import hospitalRoutes from './routes/hospitalRoutes';
import shiftRoutes from './routes/shiftRoutes';
import createConnection from './database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar CORS
const allowedOrigins = ['https://shiftmanager-jade.vercel.app'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/doctors', doctorRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/shifts', shiftRoutes);

app.get('/test', (req, res) => {
  res.send('API is working!');
});

// Iniciar o servidor
app.listen(port, async () => {
  try {
    const connection = await createConnection();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados. O servidor não será iniciado.');
  }
});
