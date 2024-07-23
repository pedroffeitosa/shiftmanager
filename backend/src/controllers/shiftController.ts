import { Request, Response } from 'express';
import createConnection from '../database';
import { Shift } from '../models/shift';

export const getShifts = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    const [results] = await connection.query('SELECT * FROM shifts');
    res.json(results);
  } catch (err: any) {
    console.error('Erro ao buscar turnos:', err);
    res.status(500).json({ error: 'Erro ao buscar turnos' });
  }
};

export const addShift = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    const newShift: Shift = req.body;
    const [results] = await connection.query('INSERT INTO shifts SET ?', newShift);
    res.json({ id: (results as any).insertId, ...newShift });
  } catch (err: any) {
    console.error('Erro ao adicionar turno:', err);
    res.status(500).json({ error: 'Erro ao adicionar turno' });
  }
};

export const updateShift = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    const updatedShift: Shift = req.body;
    await connection.query('UPDATE shifts SET ? WHERE id = ?', [updatedShift, req.params.id]);
    res.json({ message: 'Turno atualizado com sucesso' });
  } catch (err: any) {
    console.error('Erro ao atualizar turno:', err);
    res.status(500).json({ error: 'Erro ao atualizar turno' });
  }
};

export const deleteShift = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    await connection.query('DELETE FROM shifts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Turno deletado com sucesso' });
  } catch (err: any) {
    console.error('Erro ao deletar turno:', err);
    res.status(500).json({ error: 'Erro ao deletar turno' });
  }
};
