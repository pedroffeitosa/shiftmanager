export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  created_at: string;
}

export interface Hospital {
  id: number;
  name: string;
  location: string;
}

export interface Shift {
  id: number;
  doctor_id: number;
  hospital_id: number;
  start_time: string;
  end_time: string;
}
