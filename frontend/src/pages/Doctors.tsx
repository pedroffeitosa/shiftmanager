import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  created_at: string;
}

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/doctors`)
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Erro ao buscar médicos:', error));
  }, [apiUrl]);

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
