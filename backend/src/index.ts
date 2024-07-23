import express from 'express';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes';
import hospitalRoutes from './routes/hospitalRoutes';
import shiftRoutes from './routes/shiftRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['https://shiftmanager-jade.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/doctors', doctorRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/shifts', shiftRoutes);

app.get('/test', (req, res) => {
  res.send('API is working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
