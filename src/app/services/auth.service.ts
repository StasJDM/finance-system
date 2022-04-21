import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { login, logout, setUserData } from '../store/actions/app-config.actions';
import { UsersService } from './users.service';

export interface ILoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _apiService: ApiService,
    private _jwtHelper: JwtHelperService,
    private _store: Store,
    private _userService: UsersService
  ) {}

  public getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  public isAuthenticated(): boolean {
    const isAuthenticated = !this._jwtHelper.isTokenExpired(this.getToken());
    if (isAuthenticated) {
      const token_data: { id: string; email: string; firstName: string; lastName: string } =
        this._jwtHelper.decodeToken(this.getToken());

      this._store.dispatch(login());
      this._userService.getUser(token_data.id).subscribe((user) => {
        this._store.dispatch(setUserData(user));
      });
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
          const token_data: { id: string; email: string; firstName: string; lastName: string } =
            this._jwtHelper.decodeToken(res.access_token);
          this._store.dispatch(login());
          this._store.dispatch(setUserData(token_data));
        })
      );
  }

  public register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this._apiService.post('/auth/register', { firstName, lastName, email, password });
  }

  public logout(): void {
    localStorage.clear();
    this._store.dispatch(logout());
  }
}
