import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Hospital } from '../../types'; // Importar o tipo Hospital
import { toast } from 'react-toastify';

interface HospitalFormProps {
  selectedHospital: Hospital | null;
  setSelectedHospital: (hospital: Hospital | null) => void;
  onSave: () => void; // Adicionar a prop onSave
}

const HospitalForm: React.FC<HospitalFormProps> = ({ selectedHospital, setSelectedHospital, onSave }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (selectedHospital) {
      setName(selectedHospital.name);
      setLocation(selectedHospital.location);
    } else {
      setName('');
      setLocation('');
    }
  }, [selectedHospital]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const hospitalData = { name, location };

    try {
      if (selectedHospital) {
        await axios.put(`http://localhost:3000/hospitals/${selectedHospital.id}`, hospitalData);
        toast.success('Hospital atualizado com sucesso');
      } else {
        await axios.post('http://localhost:3000/hospitals', hospitalData);
        toast.success('Hospital adicionado com sucesso');
      }
      onSave(); // Chamar a função onSave após salvar
      setName('');
      setLocation('');
    } catch (error) {
      console.error('Erro ao salvar hospital:', error);
      toast.error('Erro ao salvar hospital');
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
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Localização
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          {selectedHospital ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
};

export default HospitalForm;
