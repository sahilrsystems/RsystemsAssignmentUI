import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiHost } from '../app.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private _http: HttpClient) { }

  getTopStories(searchText:string,pageNumber: number, pageSize: number): Observable<any[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize.toString())
      .set('searchString', searchText.toString());
    return this._http.get<any[]>(apiHost + '/Stories/NewStories',{params});
}
}
