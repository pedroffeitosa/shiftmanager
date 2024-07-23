import { Request, Response } from 'express';
import pool from '../database';
import { Shift } from '../models/shift';

export const getShifts = async (req: Request, res: Response) => {
  try {
    const [results] = await pool.query('SELECT * FROM shifts');
    res.json(results);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const addShift = async (req: Request, res: Response) => {
  const newShift: Shift = req.body;
  try {
    const [results] = await pool.query('INSERT INTO shifts SET ?', newShift);
    const insertId = (results as any).insertId; // Casting para `any` para acessar `insertId`
    res.json({ id: insertId, ...newShift });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const updateShift = async (req: Request, res: Response) => {
  const updatedShift: Shift = req.body;
  try {
    await pool.query('UPDATE shifts SET ? WHERE id = ?', [updatedShift, req.params.id]);
    res.json({ message: 'Shift updated successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const deleteShift = async (req: Request, res: Response) => {
  try {
    await pool.query('DELETE FROM shifts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Shift deleted successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};
