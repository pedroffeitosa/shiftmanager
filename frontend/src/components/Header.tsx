import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserMd, FaHospital, FaClipboardList, FaCalendarAlt, FaBars } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-black p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl flex items-center">
          <FaClipboardList className="mr-2" />
          Gerenciador de Plantões
        </h1>
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <FaBars />
          </button>
        </div>
        <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:space-x-4`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-4">
            <li>
              <Link to="/" className="flex items-center py-2 lg:py-0 hover:text-gray-400">
                <FaHome className="mr-1" />
                Início
              </Link>
            </li>
            <li>
              <Link to="/calendar" className="flex items-center py-2 lg:py-0 hover:text-gray-400">
                <FaCalendarAlt className="mr-1" />
                Calendário
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="flex items-center py-2 lg:py-0 hover:text-gray-400">
                <FaUserMd className="mr-1" />
                Médicos
              </Link>
            </li>
            <li>
              <Link to="/hospitals" className="flex items-center py-2 lg:py-0 hover:text-gray-400">
                <FaHospital className="mr-1" />
                Hospitais
              </Link>
            </li>
            <li>
              <Link to="/shifts" className="flex items-center py-2 lg:py-0 hover:text-gray-400">
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
