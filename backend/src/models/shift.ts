export interface Shift {
    id?: number;
    doctor_id: number;
    hospital_id: number;
    start_time: Date;
    end_time: Date;
    created_at?: Date;
  }
  