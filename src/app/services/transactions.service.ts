import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Transaction {
  id: string;
  id_from: string;
  id_to: string;
  amount: number;
  label: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private _apiService: ApiService) {}

  public getAllTransactions(): Observable<Transaction[]> {
    return this._apiService.get('/transactions', {});
  }

  public getIncomingTransactions(): Observable<Transaction[]> {
    return this._apiService.get('/transactions/incoming', {});
  }

  public getOutgoingTransactions(): Observable<Transaction[]> {
    return this._apiService.get('/transactions/outgoing', {});
  }

  public createTransaction(id_to: string, amount: number, label: string): Observable<Transaction> {
    return this._apiService.post('/transactions', { id_to, amount, label });
  }
}
