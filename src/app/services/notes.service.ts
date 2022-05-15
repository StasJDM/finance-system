import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Note {
  id: string;
  title: string;
  content: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private _apiService: ApiService) {}

  getAll(): Observable<Note[]> {
    return this._apiService.get('/notes', {});
  }

  createNote(title: string, content: string): Observable<Note> {
    return this._apiService.post('/notes', { title, content });
  }
}
