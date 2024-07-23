import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserMd, FaHospital, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-black p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl flex items-center">
          <FaClipboardList className="mr-2" />
          Gerenciador de Plantões
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="flex items-center hover:text-gray-400">
                <FaHome className="mr-1" />
                Início
              </Link>
            </li>
            <li>
              <Link to="/calendar" className="flex items-center hover:text-gray-400">
                <FaCalendarAlt className="mr-1" />
                Calendário
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="flex items-center hover:text-gray-400">
                <FaUserMd className="mr-1" />
                Médicos
              </Link>
            </li>
            <li>
              <Link to="/hospitals" className="flex items-center hover:text-gray-400">
                <FaHospital className="mr-1" />
                Hospitais
              </Link>
            </li>
            <li>
              <Link to="/shifts" className="flex items-center hover:text-gray-400">
                <FaClipboardList className="mr-1" />
                Turnos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
