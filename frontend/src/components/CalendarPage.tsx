import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../api';

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
    api.get('/shifts')
      .then((response: { data: Shift[] }) => setShifts(response.data))
      .catch((error: any) => console.error('Erro ao buscar turnos:', error));
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
              Dr. {shift.doctor_id} no Hospital {shift.hospital_id} às {new Date(shift.start_time).toLocaleTimeString()} - {new Date(shift.end_time).toLocaleTimeString()}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-xl mb-4">Calendário de Plantões</h2>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-center">
        <div className="w-full lg:w-4/5 xl:w-3/4">
          <Calendar
            onChange={(value) => setDate(Array.isArray(value) ? value[0] : value)}
            value={date}
            tileContent={renderTileContent}
            className="w-full"
          />
        </div>
      </div>
      <div className="mt-4">
        <h3>Turnos para {date?.toLocaleDateString('pt-BR')}</h3>
        <ul>
          {date && getShiftsForDate(date).map(shift => (
            <li key={shift.id}>
              Dr. {shift.doctor_id} no Hospital {shift.hospital_id} - {new Date(shift.start_time).toLocaleTimeString()} às {new Date(shift.end_time).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;
