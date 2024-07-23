import { Router } from 'express';
import { getHospitals, addHospital, updateHospital, deleteHospital } from '../controllers/hospitalController';

const router = Router();

router.get('/', getHospitals);
router.post('/', addHospital);
router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);

export default router;
