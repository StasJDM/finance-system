import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface ILoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _apiService: ApiService,
    private _jwtHelper: JwtHelperService
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token') || '';

    return !this._jwtHelper.isTokenExpired(token);
  }

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
