import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <h1 className="text-2xl">ShiftManager</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
          <li><Link to="/hospitals">Hospitals</Link></li>
          <li><Link to="/shifts">Shifts</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
