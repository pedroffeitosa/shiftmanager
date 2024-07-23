import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shift } from '../../types'; // Importar o tipo Shift
import { toast } from 'react-toastify';

interface ShiftFormProps {
  selectedShift: Shift | null;
  setSelectedShift: (shift: Shift | null) => void;
}

const ShiftForm: React.FC<ShiftFormProps> = ({ selectedShift, setSelectedShift }) => {
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [hospitalId, setHospitalId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (selectedShift) {
      setDoctorId(selectedShift.doctor_id);
      setHospitalId(selectedShift.hospital_id);
      setStartTime(selectedShift.start_time);
      setEndTime(selectedShift.end_time);
    } else {
      setDoctorId(null);
      setHospitalId(null);
      setStartTime('');
      setEndTime('');
    }
  }, [selectedShift]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const shiftData = { doctor_id: doctorId, hospital_id: hospitalId, start_time: startTime, end_time: endTime };

    try {
      if (selectedShift) {
        await axios.put(`http://localhost:3000/shifts/${selectedShift.id}`, shiftData);
        toast.success('Turno atualizado com sucesso');
      } else {
        await axios.post('http://localhost:3000/shifts', shiftData);
        toast.success('Turno adicionado com sucesso');
      }
      setSelectedShift(null);
      setDoctorId(null);
      setHospitalId(null);
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error('Erro ao salvar turno:', error);
      toast.error('Erro ao salvar turno');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md mb-4">
      <div className="mb-4">
        <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
          ID do Médico
        </label>
        <input
          type="number"
          id="doctorId"
          value={doctorId || ''}
          onChange={(e) => setDoctorId(Number(e.target.value))}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700">
          ID do Hospital
        </label>
        <input
          type="number"
          id="hospitalId"
          value={hospitalId || ''}
          onChange={(e) => setHospitalId(Number(e.target.value))}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
          Hora de Início
        </label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
          Hora de Término
        </label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          {selectedShift ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
};

export default ShiftForm;
