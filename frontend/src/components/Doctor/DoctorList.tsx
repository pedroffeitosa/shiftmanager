import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorForm from './DoctorForm';
import { Doctor } from '../../types'; // Importar o tipo Doctor

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Erro ao buscar médicos:', error));
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:3000/doctors/${id}`)
      .then(() => setDoctors(doctors.filter(doctor => doctor.id !== id)))
      .catch(error => console.error('Erro ao deletar médico:', error));
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Lista de Médicos</h2>
      <DoctorForm selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} />
      <ul className="mt-4">
        {doctors.map(doctor => (
          <li key={doctor.id} className="mb-2 flex justify-between items-center border-b pb-2">
            <span>{doctor.name} - {doctor.specialty}</span>
            <div>
              <button onClick={() => setSelectedDoctor(doctor)} className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
              <button onClick={() => doctor.id && handleDelete(doctor.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
