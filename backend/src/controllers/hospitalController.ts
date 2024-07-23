import { Request, Response } from 'express';
import createConnection from '../database';
import { Hospital } from '../models/hospital';

export const getHospitals = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    const [results] = await connection.query('SELECT * FROM hospitals');
    res.json(results);
  } catch (err: any) {
    console.error('Erro ao buscar hospitais:', err);
    res.status(500).json({ error: 'Erro ao buscar hospitais' });
  }
};

export const addHospital = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    const newHospital: Hospital = req.body;
    const [results] = await connection.query('INSERT INTO hospitals SET ?', newHospital);
    res.json({ id: (results as any).insertId, ...newHospital });
  } catch (err: any) {
    console.error('Erro ao adicionar hospital:', err);
    res.status(500).json({ error: 'Erro ao adicionar hospital' });
  }
};

export const updateHospital = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    const updatedHospital: Hospital = req.body;
    await connection.query('UPDATE hospitals SET ? WHERE id = ?', [updatedHospital, req.params.id]);
    res.json({ message: 'Hospital atualizado com sucesso' });
  } catch (err: any) {
    console.error('Erro ao atualizar hospital:', err);
    res.status(500).json({ error: 'Erro ao atualizar hospital' });
  }
};

export const deleteHospital = async (req: Request, res: Response) => {
  try {
    const connection = await createConnection();
    await connection.query('DELETE FROM hospitals WHERE id = ?', [req.params.id]);
    res.json({ message: 'Hospital deletado com sucesso' });
  } catch (err: any) {
    console.error('Erro ao deletar hospital:', err);
    res.status(500).json({ error: 'Erro ao deletar hospital' });
  }
};
