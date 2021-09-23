import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  get(url: string, params: any): Observable<any> {
    return this._http.get(API_URL + url, { params });
  }

  post(url: string, body: any): Observable<any> {
    return this._http.post(API_URL + url, body);
  }

  put(url: string, body: any): Observable<any> {
    return this._http.put(API_URL + url, body);
  }

  delete(url: string, params: any): Observable<any> {
    return this._http.delete(API_URL + url, { params });
  }
}
