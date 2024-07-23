import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShiftForm from './ShiftForm';
import { Shift } from '../../types';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

const ShiftList: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = () => {
    axios.get(`${apiUrl}/shifts`)
      .then(response => setShifts(response.data))
      .catch(error => {
        console.error('Erro ao buscar turnos:', error);
        toast.error('Erro ao buscar turnos');
      });
  };

  const handleDelete = (id: number) => {
    axios.delete(`${apiUrl}/shifts/${id}`)
      .then(() => {
        setShifts(shifts.filter(shift => shift.id !== id));
        toast.success('Turno deletado com sucesso');
      })
      .catch(error => {
        console.error('Erro ao deletar turno:', error);
        toast.error(error.response?.data?.error || 'Erro ao deletar turno');
      });
  };

  const handleSave = () => {
    fetchShifts();
    setSelectedShift(null);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Lista de Turnos</h2>
      <ShiftForm selectedShift={selectedShift} setSelectedShift={setSelectedShift} onSave={handleSave} />
      <ul className="mt-4">
        {shifts.map(shift => (
          <li key={shift.id} className="mb-2 flex justify-between items-center border-b pb-2">
            <span>Dr. {shift.doctor_id} no Hospital {shift.hospital_id} - {new Date(shift.start_time).toLocaleTimeString()} às {new Date(shift.end_time).toLocaleTimeString()}</span>
            <div>
              <button onClick={() => setSelectedShift(shift)} className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded-md">Editar</button>
              <button onClick={() => shift.id && handleDelete(shift.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftList;
