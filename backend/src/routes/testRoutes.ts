import { Router } from 'express';
import connection from '../database';
import { RowDataPacket } from 'mysql2';

const router = Router();

router.get('/test', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results: RowDataPacket[]) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ solution: results[0].solution });
  });
});

export default router;
