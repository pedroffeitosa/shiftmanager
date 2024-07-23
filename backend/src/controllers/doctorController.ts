import { Request, Response } from 'express';
import createConnection from '../database';
import { Doctor } from '../models/doctor';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    const [results] = await connection.query('SELECT * FROM doctors');
    res.json(results);
  } catch (err: any) {
    console.error('Erro ao buscar médicos:', err);
    res.status(500).json({ error: 'Erro ao buscar médicos' });
  }
};

export const addDoctor = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    const newDoctor: Doctor = req.body;
    const [results] = await connection.query('INSERT INTO doctors SET ?', newDoctor);
    res.json({ id: (results as any).insertId, ...newDoctor });
  } catch (err: any) {
    console.error('Erro ao adicionar médico:', err);
    res.status(500).json({ error: 'Erro ao adicionar médico' });
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    const updatedDoctor: Doctor = req.body;
    await connection.query('UPDATE doctors SET ? WHERE id = ?', [updatedDoctor, req.params.id]);
    res.json({ message: 'Médico atualizado com sucesso' });
  } catch (err: any) {
    console.error('Erro ao atualizar médico:', err);
    res.status(500).json({ error: 'Erro ao atualizar médico' });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    await connection.query('DELETE FROM doctors WHERE id = ?', [req.params.id]);
    res.json({ message: 'Médico deletado com sucesso' });
  } catch (err: any) {
    console.error('Erro ao deletar médico:', err);
    res.status(500).json({ error: 'Erro ao deletar médico' });
  }
};
