import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shift } from '../../types'; // Importar o tipo Shift

interface ShiftFormProps {
  selectedShift: Shift | null;
  setSelectedShift: (shift: Shift | null) => void;
}

const ShiftForm: React.FC<ShiftFormProps> = ({ selectedShift, setSelectedShift }) => {
  const [shift, setShift] = useState<Shift>({ doctor_id: 0, hospital_id: 0, start_time: '', end_time: '' });

  useEffect(() => {
    if (selectedShift) {
      setShift(selectedShift);
    } else {
      setShift({ doctor_id: 0, hospital_id: 0, start_time: '', end_time: '' });
    }
  }, [selectedShift]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shift.id !== undefined) {
      axios.put(`http://localhost:3000/shifts/${shift.id}`, shift)
        .then(response => setSelectedShift(null))
        .catch(error => console.error('Erro ao atualizar turno:', error));
    } else {
      axios.post('http://localhost:3000/shifts', shift)
        .then(response => setSelectedShift(null))
        .catch(error => console.error('Erro ao criar turno:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-gray-100 p-4 rounded-md shadow-md">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Doctor ID</label>
        <input
          type="number"
          value={shift.doctor_id}
          onChange={(e) => setShift({ ...shift, doctor_id: parseInt(e.target.value) })}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Hospital ID</label>
        <input
          type="number"
          value={shift.hospital_id}
          onChange={(e) => setShift({ ...shift, hospital_id: parseInt(e.target.value) })}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="datetime-local"
          value={shift.start_time}
          onChange={(e) => setShift({ ...shift, start_time: e.target.value })}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">End Time</label>
        <input
          type="datetime-local"
          value={shift.end_time}
          onChange={(e) => setShift({ ...shift, end_time: e.target.value })}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
    </form>
  );
};

export default ShiftForm;
