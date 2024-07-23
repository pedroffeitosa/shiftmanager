import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Doctor } from '../../types';
import { toast } from 'react-toastify';

interface DoctorFormProps {
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  onSave: () => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ selectedDoctor, setSelectedDoctor, onSave }) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  useEffect(() => {
    if (selectedDoctor) {
      setName(selectedDoctor.name);
      setSpecialty(selectedDoctor.specialty);
    } else {
      setName('');
      setSpecialty('');
    }
  }, [selectedDoctor]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const doctorData = { name, specialty };

    try {
      if (selectedDoctor) {
        await api.put(`/doctors/${selectedDoctor.id}`, doctorData);
        toast.success('Médico atualizado com sucesso');
      } else {
        await api.post('/doctors', doctorData);
        toast.success('Médico adicionado com sucesso');
      }
      onSave();
      setName('');
      setSpecialty('');
    } catch (error) {
      console.error('Erro ao salvar médico:', error);
      toast.error('Erro ao salvar médico');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md mb-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
          Especialidade
        </label>
        <input
          type="text"
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          {selectedDoctor ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
