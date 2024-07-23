import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DoctorsPage from './pages/DoctorsPage';
import HospitalsPage from './pages/HospitalsPage';
import ShiftsPage from './pages/ShiftsPage';
import CalendarPage from './pages/CalendarPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="mb-4 bg-black p-4 shadow-md">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-white hover:underline">Calendar</Link></li>
            <li><Link to="/doctors" className="text-white hover:underline">Doctors</Link></li>
            <li><Link to="/hospitals" className="text-white hover:underline">Hospitals</Link></li>
            <li><Link to="/shifts" className="text-white hover:underline">Shifts</Link></li>
          </ul>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/hospitals" element={<HospitalsPage />} />
            <Route path="/shifts" element={<ShiftsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
