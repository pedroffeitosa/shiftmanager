import { Router } from 'express';
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController';

const router = Router();

router.get('/', getDoctors);
router.post('/', addDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;
