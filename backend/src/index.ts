import express from 'express';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes';
import hospitalRoutes from './routes/hospitalRoutes';
import shiftRoutes from './routes/shiftRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/doctors', doctorRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/shifts', shiftRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
