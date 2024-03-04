import { Client } from "./Client";

export interface Appointment {
  AppointmentID: number;
  AccountID:number;
  ClientID:number;
  AppointmentStartTime: Date;
  AppointmentEndTime: Date;
  CreatedDate: Date;
  ModifiedDate: Date;
  ClientName:string
  }

  