import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _apiService: ApiService) {}

  public updateUser(user: User): Observable<User> {
    return this._apiService.patch('/users/' + user.id, user);
  }

  public getUser(id: string): Observable<User> {
    return this._apiService.get('/users/' + id, {});
  }
}
