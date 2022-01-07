import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { login } from '../store/actions/app-config.actions';

export interface ILoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _apiService: ApiService, private _jwtHelper: JwtHelperService, private _store: Store) {}

  public getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  public isAuthenticated(): boolean {
    const isAuthenticated = !this._jwtHelper.isTokenExpired(this.getToken());
    if (isAuthenticated) {
      const token_data: { id: string; email: string; first_name: string; last_name: string } =
        this._jwtHelper.decodeToken(this.getToken());
      this._store.dispatch(login(token_data));
    }
    return isAuthenticated;
  }

  public login(email: string, password: string): Observable<any> {
    return this._apiService
      .post('/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((res: ILoginResponse) => localStorage.setItem('access_token', res.access_token)),
        tap((res: ILoginResponse) => {
          const token_data: { id: string; email: string; first_name: string; last_name: string } =
            this._jwtHelper.decodeToken(res.access_token);
          this._store.dispatch(login(token_data));
        })
      );
  }

  public register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this._apiService.post('/auth/register', { first_name: firstName, last_name: lastName, email, password });
  }
}
