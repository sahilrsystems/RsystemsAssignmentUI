import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../Entities/Client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'https://localhost:7060/api/'; // Replace with your API URL
  
  getClients(pagenumber:number,pageCount:number,accountID:number,searchedValue:any): Observable<Client[]> {
    if(searchedValue == "null"){
      searchedValue = "";
    }
    let params = new HttpParams()
      .set('pageIndex', pagenumber.toString())
      .set('pageSize', pageCount.toString())
      .set('accountID', accountID.toString())
      .set('searchValue', searchedValue);
    return this.http.get<any[]>(this.baseUrl +'Client/Index',{ params });
  }

  createClient(dto:Client): Observable<Client> {
    console.log(dto);
    return this.http.post<any>(this.baseUrl +'Client/Create',dto);
  }

  updateClient(client:Client): Observable<Client[]> {
    console.log(client);
    return this.http.put<any[]>(this.baseUrl +'Client/Update',client);
  }

  deleteClient(id:number,accountID:number): Observable<boolean> {
    let params = new HttpParams()
      .set('id', id.toString())
      .set('accountID', accountID.toString());
    return this.http.delete<boolean>(this.baseUrl +'Client/Delete',{params });
  }
  constructor(private http: HttpClient) { }
}
