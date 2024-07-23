import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HospitalForm from './HospitalForm';
import { Hospital } from '../../types'; // Importar o tipo Hospital
import { toast } from 'react-toastify';

const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/hospitals')
      .then(response => setHospitals(response.data))
      .catch(error => {
        console.error('Erro ao buscar hospitais:', error);
        toast.error('Erro ao buscar hospitais');
      });
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:3000/hospitals/${id}`)
      .then(() => {
        setHospitals(hospitals.filter(hospital => hospital.id !== id));
        toast.success('Hospital deletado com sucesso');
      })
      .catch(error => {
        console.error('Erro ao deletar hospital:', error);
        toast.error(error.response?.data?.error || 'Erro ao deletar hospital');
      });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Lista de Hospitais</h2>
      <HospitalForm selectedHospital={selectedHospital} setSelectedHospital={setSelectedHospital} />
      <ul className="mt-4">
        {hospitals.map(hospital => (
          <li key={hospital.id} className="mb-2 flex justify-between items-center border-b pb-2">
            <span>{hospital.name} - {hospital.location}</span>
            <div>
              <button onClick={() => setSelectedHospital(hospital)} className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
              <button onClick={() => hospital.id && handleDelete(hospital.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalList;
