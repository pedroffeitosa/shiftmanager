import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Hospital {
  id: number;
  name: string;
  location: string;
  created_at: string;
}

const Hospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/hospitals`)
      .then(response => setHospitals(response.data))
      .catch(error => console.error('Erro ao buscar hospitais:', error));
  }, [apiUrl]);

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-xl mb-4">Lista de Hospitais</h2>
      <ul>
        {hospitals.map(hospital => (
          <li key={hospital.id}>{hospital.name} - {hospital.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default Hospitals;
