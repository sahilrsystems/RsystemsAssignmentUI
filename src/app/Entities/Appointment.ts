import { Client } from "./Client";

export interface Appointment {
  AppointmentID: number;
  ClientID:number;
  AppointmentStartTime: Date;
  AppointmentEndTime: Date;
  CreatedDate: Date;
  ModifiedDate: Date;
  Client:Client
  }

  