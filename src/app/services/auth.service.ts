import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface ILoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _apiService: ApiService) {}

  login(username: string, password: string): Observable<any> {
    return this._apiService
      .post('/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((res: ILoginResponse) =>
          localStorage.setItem('access_token', res.access_token)
        )
      );
  }
}
