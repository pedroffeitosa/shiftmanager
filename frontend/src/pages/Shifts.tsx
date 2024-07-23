import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Shift {
  id: number;
  doctor_id: number;
  hospital_id: number;
  start_time: string;
  end_time: string;
  created_at: string;
}

const Shifts: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/shifts')
      .then(response => setShifts(response.data))
      .catch(error => console.error('Erro ao buscar turnos:', error));
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-xl mb-4">Lista de Turnos</h2>
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>Doctor ID: {shift.doctor_id} - Hospital ID: {shift.hospital_id} - {new Date(shift.start_time).toLocaleString()} to {new Date(shift.end_time).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Shifts;
