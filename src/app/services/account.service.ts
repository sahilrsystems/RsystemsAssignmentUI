import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../Entities/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'https://localhost:7060/api/'; // Replace with your API URL
  getAccounts(pageNumber:number,pageSize:number, searchValue:any): Observable<Account[]> {
    if(searchValue == "null"){
      searchValue = "";
    }
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('searchValue', searchValue);
    return this.http.get<any[]>(this.baseUrl +'Account/Index',{params });
  }

  createAccount(dto:Account): Observable<Account[]> {
    return this.http.post<any[]>(this.baseUrl +'Account/Create',dto);
  }

  updateAccount(dto:Account): Observable<Account[]> {
    return this.http.put<any[]>(this.baseUrl +'Account/Update',dto);
  }

  deleteAccount(id:number): Observable<boolean> {
    let params = new HttpParams()
      .set('id', id.toString());
    return this.http.delete<boolean>(this.baseUrl +'Account/Delete',{params });
  }

  getItems(pagenumber:number,pageCount:number): Observable<Account[]> {
    let params = new HttpParams()
      .set('pageNumber', pagenumber.toString())
      .set('pageCount', pageCount.toString());
    return this.http.get<Account[]>(this.baseUrl +'Account/Index',{ params });
  }
  constructor(private http: HttpClient) { }
}
