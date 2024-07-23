import { Request, Response } from 'express';
import pool from '../database';
import { Doctor } from '../models/doctor';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const [results] = await pool.query('SELECT * FROM doctors');
    res.json(results);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const addDoctor = async (req: Request, res: Response) => {
  const newDoctor: Doctor = req.body;
  try {
    const [results] = await pool.query('INSERT INTO doctors SET ?', newDoctor);
    const insertId = (results as any).insertId; // Casting para `any` para acessar `insertId`
    res.json({ id: insertId, ...newDoctor });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  const updatedDoctor: Doctor = req.body;
  try {
    await pool.query('UPDATE doctors SET ? WHERE id = ?', [updatedDoctor, req.params.id]);
    res.json({ message: 'Doctor updated successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    await pool.query('DELETE FROM doctors WHERE id = ?', [req.params.id]);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
};
