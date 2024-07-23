import { Request, Response } from 'express';
import connection from '../database';
import { Hospital } from '../types'; // Importar o tipo Hospital

export const getHospitals = (req: Request, res: Response) => {
  connection.query('SELECT * FROM hospitals', (err, results) => {
    if (err) {
      console.error('Error fetching hospitals:', err);
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
      console.error('Error adding hospital:', err);
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
      console.error('Error updating hospital:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Hospital updated successfully' });
  });
};

export const deleteHospital = (req: Request, res: Response) => {
  const hospitalId = req.params.id;

  connection.query('DELETE FROM shifts WHERE hospital_id = ?', [hospitalId], (err, results) => {
    if (err) {
      console.error('Error deleting shifts:', err);
      res.status(500).json({ error: 'Não foi possível deletar o hospital porque ele está associado a um turno.' });
      return;
    }

    connection.query('DELETE FROM hospitals WHERE id = ?', [hospitalId], (err, results) => {
      if (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
          console.error('Error deleting hospital:', err);
          res.status(500).json({ error: 'Não foi possível deletar o hospital porque ele está associado a um turno.' });
        } else {
          console.error('Error deleting hospital:', err);
          res.status(500).json({ error: err.message });
        }
        return;
      }
      res.json({ message: 'Hospital and associated shifts deleted successfully' });
    });
  });
};
