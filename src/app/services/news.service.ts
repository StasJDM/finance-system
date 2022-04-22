import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface News {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private _apiService: ApiService) {}

  getAll(): Observable<News[]> {
    return this._apiService.get('/news', {});
  }

  getById(id: string): Observable<News> {
    return this._apiService.get('/news/' + id, {});
  }
}
