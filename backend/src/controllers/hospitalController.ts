import { Request, Response } from 'express';
import pool from '../database';
import { Hospital } from '../models/hospital';

export const getHospitals = async (req: Request, res: Response) => {
  try {
    const [results] = await pool.query('SELECT * FROM hospitals');
    res.json(results);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const addHospital = async (req: Request, res: Response) => {
  const newHospital: Hospital = req.body;
  try {
    const [results] = await pool.query('INSERT INTO hospitals SET ?', newHospital);
    const insertId = (results as any).insertId; // Casting para `any` para acessar `insertId`
    res.json({ id: insertId, ...newHospital });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const updateHospital = async (req: Request, res: Response) => {
  const updatedHospital: Hospital = req.body;
  try {
    await pool.query('UPDATE hospitals SET ? WHERE id = ?', [updatedHospital, req.params.id]);
    res.json({ message: 'Hospital updated successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const deleteHospital = async (req: Request, res: Response) => {
  try {
    await pool.query('DELETE FROM hospitals WHERE id = ?', [req.params.id]);
    res.json({ message: 'Hospital deleted successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};
