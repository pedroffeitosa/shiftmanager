import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DoctorsPage from './pages/DoctorsPage';
import HospitalsPage from './pages/HospitalsPage';
import ShiftsPage from './pages/ShiftsPage';
import CalendarPage from './components/CalendarPage'; // Corrigir o caminho se necessário

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
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
