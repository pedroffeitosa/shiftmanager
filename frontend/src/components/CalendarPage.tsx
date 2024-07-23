import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/shifts`)
      .then(response => setShifts(response.data))
      .catch(error => toast.error('Erro ao buscar turnos'));
  }, [apiUrl]);

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
        <div className="text-xs mt-1">
          {dayShifts.map(shift => (
            <div key={shift.id} className="text-blue-500">
              Dr. {shift.doctor_id} no Hospital {shift.hospital_id}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Calendário de Plantões</h2>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-center">
        <div className="w-full lg:w-4/5 xl:w-3/4">
          <Calendar
            onChange={(value) => setDate(Array.isArray(value) ? value[0] : value)}
            value={date}
            tileContent={renderTileContent}
            className="w-full border rounded-lg"
            tileClassName={({ date, view }) => {
              const dayShifts = getShiftsForDate(date);
              if (view === 'month' && dayShifts.length > 0) {
                return 'bg-blue-100 text-blue-900';
              }
              return '';
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Turnos para {date?.toLocaleDateString('pt-BR')}</h3>
        <ul>
          {date && getShiftsForDate(date).map(shift => (
            <li key={shift.id} className="mb-2">
              Dr. {shift.doctor_id} no Hospital {shift.hospital_id} - {new Date(shift.start_time).toLocaleTimeString()} às {new Date(shift.end_time).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;
