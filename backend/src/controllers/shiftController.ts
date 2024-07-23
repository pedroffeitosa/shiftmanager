import { Request, Response } from 'express';
import connection from '../database';
import { Shift } from '../types'; // Importar o tipo Shift

export const getShifts = (req: Request, res: Response) => {
  connection.query('SELECT * FROM shifts', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

export const addShift = (req: Request, res: Response) => {
  const newShift: Shift = req.body;
  connection.query('INSERT INTO shifts SET ?', newShift, (err, results: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: results.insertId, ...newShift });
  });
};

export const updateShift = (req: Request, res: Response) => {
  const updatedShift: Shift = req.body;
  connection.query('UPDATE shifts SET ? WHERE id = ?', [updatedShift, req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Shift updated successfully' });
  });
};

export const deleteShift = (req: Request, res: Response) => {
  connection.query('DELETE FROM shifts WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Shift deleted successfully' });
  });
};
