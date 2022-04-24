import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Transaction } from './transactions.service';
import { User } from './users.service';

export interface Category {
  id: string;
  label: string;
  description: string;
  owner_id: string;
  owner: User;
  transactions: Transaction[];
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _apiService: ApiService) {}

  getAll(): Observable<Category[]> {
    return this._apiService.get('/categories', {});
  }
}
