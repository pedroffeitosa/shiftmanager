import { Request, Response } from 'express';
import connection from '../database';
import { Doctor } from '../types'; // Importar o tipo Doctor

export const getDoctors = (req: Request, res: Response) => {
  connection.query('SELECT * FROM doctors', (err, results) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

export const addDoctor = (req: Request, res: Response) => {
  const newDoctor: Doctor = req.body;
  connection.query('INSERT INTO doctors SET ?', newDoctor, (err, results: any) => {
    if (err) {
      console.error('Error adding doctor:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: results.insertId, ...newDoctor });
  });
};

export const updateDoctor = (req: Request, res: Response) => {
  const updatedDoctor: Doctor = req.body;
  connection.query('UPDATE doctors SET ? WHERE id = ?', [updatedDoctor, req.params.id], (err, results) => {
    if (err) {
      console.error('Error updating doctor:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Doctor updated successfully' });
  });
};

export const deleteDoctor = (req: Request, res: Response) => {
  const doctorId = req.params.id;

  // Primeiro deletar os turnos associados ao médico
  connection.query('DELETE FROM shifts WHERE doctor_id = ?', [doctorId], (err, results) => {
    if (err) {
      console.error('Error deleting shifts:', err);
      res.status(500).json({ error: 'Não foi possível deletar o médico porque ele está associado a um turno.' });
      return;
    }

    // Depois deletar o médico
    connection.query('DELETE FROM doctors WHERE id = ?', [doctorId], (err, results) => {
      if (err) {
        console.error('Error deleting doctor:', err);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Doctor and associated shifts deleted successfully' });
    });
  });
};
