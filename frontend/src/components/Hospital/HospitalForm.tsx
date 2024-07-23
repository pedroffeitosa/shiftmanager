import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Hospital } from '../../types'; // Importar o tipo Hospital

interface HospitalFormProps {
  selectedHospital: Hospital | null;
  setSelectedHospital: (hospital: Hospital | null) => void;
}

const HospitalForm: React.FC<HospitalFormProps> = ({ selectedHospital, setSelectedHospital }) => {
  const [hospital, setHospital] = useState<Hospital>({ name: '', location: '' });

  useEffect(() => {
    if (selectedHospital) {
      setHospital(selectedHospital);
    } else {
      setHospital({ name: '', location: '' });
    }
  }, [selectedHospital]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hospital.id !== undefined) {
      axios.put(`http://localhost:3000/hospitals/${hospital.id}`, hospital)
        .then(response => setSelectedHospital(null))
        .catch(error => console.error('Erro ao atualizar hospital:', error));
    } else {
      axios.post('http://localhost:3000/hospitals', hospital)
        .then(response => setSelectedHospital(null))
        .catch(error => console.error('Erro ao criar hospital:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-gray-100 p-4 rounded-md shadow-md">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={hospital.name}
          onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={hospital.location}
          onChange={(e) => setHospital({ ...hospital, location: e.target.value })}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
    </form>
  );
};

export default HospitalForm;
