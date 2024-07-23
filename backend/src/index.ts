import express from 'express';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes';
import hospitalRoutes from './routes/hospitalRoutes';
import shiftRoutes from './routes/shiftRoutes';
import testRoutes from './routes/testRoutes'; 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/doctors', doctorRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/shifts', shiftRoutes);
app.use('/test', testRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
