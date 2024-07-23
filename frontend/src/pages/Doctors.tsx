import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Rest of the code remains the same

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  created_at: string;
}

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Erro ao buscar médicos:', error));
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
