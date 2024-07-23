import express from 'express';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes';
import hospitalRoutes from './routes/hospitalRoutes';
import shiftRoutes from './routes/shiftRoutes';

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['https://shiftmanager-jade.vercel.app'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

app.use(express.json());
app.use('/doctors', doctorRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/shifts', shiftRoutes);

app.get('/test', (req, res) => {
  res.send('API is working!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
