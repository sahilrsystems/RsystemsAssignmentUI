import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../Entities/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'https://localhost:7060/api/'; // Replace with your API URL
  
  getAccounts(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl +'Appointment/Index');
  }

  deleteAppointment(id:number,accountID:number): Observable<boolean> {
    let params = new HttpParams()
      .set('appointmentID', id.toString())
      .set('accountID', accountID.toString());
    return this.http.delete<boolean>(this.baseUrl +'Appointment/Delete',{params });
  }

  createAppointment(dto:Appointment): Observable<Appointment[]> {
    return this.http.post<any[]>(this.baseUrl +'Appointment/Create',dto);
  }

  updateAppointment(dto:Appointment): Observable<Appointment[]> {
    return this.http.put<any[]>(this.baseUrl +'Appointment/Update',dto);
  }

  getItems(pageIndex:number,pageSize:number): Observable<Appointment[]> {
    let params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get<any[]>(this.baseUrl +'Appointment/Index',{ params });
  }
  constructor(private http: HttpClient) { }
}
