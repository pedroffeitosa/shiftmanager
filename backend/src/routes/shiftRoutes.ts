import { Router } from 'express';
import { getShifts, addShift, updateShift, deleteShift } from '../controllers/shiftController';

const router = Router();

router.get('/', getShifts);
router.post('/', addShift);
router.put('/:id', updateShift);
router.delete('/:id', deleteShift);

export default router;
