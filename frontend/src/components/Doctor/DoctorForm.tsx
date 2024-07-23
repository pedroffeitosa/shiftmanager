import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doctor } from '../../types'; // Importar o tipo Doctor

interface DoctorFormProps {
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ selectedDoctor, setSelectedDoctor }) => {
  const [doctor, setDoctor] = useState<Doctor>({ name: '', specialty: '' });

  useEffect(() => {
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
    } else {
      setDoctor({ name: '', specialty: '' });
    }
  }, [selectedDoctor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (doctor.id !== undefined) {
      axios.put(`http://localhost:3000/doctors/${doctor.id}`, doctor)
        .then(response => setSelectedDoctor(null))
        .catch(error => console.error('Erro ao atualizar médico:', error));
    } else {
      axios.post('http://localhost:3000/doctors', doctor)
        .then(response => setSelectedDoctor(null))
        .catch(error => console.error('Erro ao criar médico:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-gray-100 p-4 rounded-md shadow-md">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={doctor.name}
          onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Specialty</label>
        <input
          type="text"
          value={doctor.specialty}
          onChange={(e) => setDoctor({ ...doctor, specialty: e.target.value })}
          className="border p-2 w-full rounded-md"
        />
      </div>
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
    </form>
  );
};

export default DoctorForm;
