import React, { useEffect, useState } from 'react';
import api from '../api'; 
import { Doctor } from '../types';

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    api.get('/doctors')
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error('Erro ao buscar médicos:', error));
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-xl mb-4">Lista de Médicos</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>{doctor.name} - {doctor.specialty}</li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
