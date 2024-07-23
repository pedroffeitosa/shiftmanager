import React, { useEffect, useState } from 'react';
import api from '../api';

interface Shift {
  id: number;
  doctor_id: number;
  hospital_id: number;
  start_time: string;
  end_time: string;
}

const Shifts: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    api.get('/shifts')
      .then((response) => setShifts(response.data))
      .catch((error) => console.error('Erro ao buscar turnos:', error));
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-xl mb-4">Lista de Turnos</h2>
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>
            Médico ID: {shift.doctor_id} no Hospital ID: {shift.hospital_id} das {new Date(shift.start_time).toLocaleTimeString()} às {new Date(shift.end_time).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shifts;
