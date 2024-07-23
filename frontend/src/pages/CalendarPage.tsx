import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

interface Shift {
  id: number;
  doctor_id: number;
  hospital_id: number;
  start_time: string;
  end_time: string;
}

const CalendarPage: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(() => {
    axios.get('http://localhost:3000/shifts')
      .then(response => setShifts(response.data))
      .catch(error => console.error('Erro ao buscar turnos:', error));
  }, []);

  const getShiftsForDate = (date: Date) => {
    return shifts.filter(shift => {
      const shiftDate = new Date(shift.start_time);
      return (
        shiftDate.getFullYear() === date.getFullYear() &&
        shiftDate.getMonth() === date.getMonth() &&
        shiftDate.getDate() === date.getDate()
      );
    });
  };

  const renderTileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const dayShifts = getShiftsForDate(date);
      return (
        <div className="text-xs">
          {dayShifts.map(shift => (
            <div key={shift.id}>
              Dr. {shift.doctor_id} at Hospital {shift.hospital_id}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Calendário de Plantões</h2>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-center">
        <div className="w-full">
          <Calendar
            onChange={(value) => setDate(Array.isArray(value) ? value[0] : value)}
            value={date}
            tileContent={renderTileContent}
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Turnos para {date?.toDateString()}</h3>
        <ul className="mt-2">
          {date && getShiftsForDate(date).map(shift => (
            <li key={shift.id} className="mb-2">
              Dr. {shift.doctor_id} at Hospital {shift.hospital_id} - {new Date(shift.start_time).toLocaleTimeString()} to {new Date(shift.end_time).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;
