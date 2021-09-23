import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _apiService: ApiService) {}

  login(username: string, password: string): Observable<any> {
    return this._apiService.post('/auth/login', {
      username,
      password,
    });
  }
}
