import { Request, Response } from 'express';
import connection from '../database';
import { Hospital } from '../types'; // Importar o tipo Hospital

export const getHospitals = (req: Request, res: Response) => {
  connection.query('SELECT * FROM hospitals', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
};

export const addHospital = (req: Request, res: Response) => {
  const newHospital: Hospital = req.body;
  connection.query('INSERT INTO hospitals SET ?', newHospital, (err, results: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: results.insertId, ...newHospital });
  });
};

export const updateHospital = (req: Request, res: Response) => {
  const updatedHospital: Hospital = req.body;
  connection.query('UPDATE hospitals SET ? WHERE id = ?', [updatedHospital, req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Hospital updated successfully' });
  });
};

export const deleteHospital = (req: Request, res: Response) => {
  connection.query('DELETE FROM hospitals WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Hospital deleted successfully' });
  });
};
