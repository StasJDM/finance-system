import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Category } from './category.service';
import { User } from './users.service';

export interface Transaction {
  id: string;
  id_from: string;
  id_to: string;
  amount: number;
  label: string;
  from?: User;
  to?: User;
  categories?: Category[];
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

  public getAllTransactionsAmount(): Observable<{ incoming: number; outgoing: number }> {
    return this._apiService.get('/transactions/amount', {});
  }

  public getIncomingTransactions(): Observable<Transaction[]> {
    return this._apiService.get('/transactions/incoming', {});
  }

  public getIncomingTransactionsAmount(): Observable<number> {
    return this._apiService.get('/transactions/incoming/amount', {}).pipe(map((res: { amount: number }) => res.amount));
  }

  public getIncomingTransactionsTop(): Observable<Transaction[]> {
    return this._apiService.get('/transactions/incoming/top', {});
  }

  public getOutgoingTransactions(): Observable<Transaction[]> {
    return this._apiService.get('/transactions/outgoing', {});
  }

  public getOutgoingTransactionsAmount(): Observable<number> {
    return this._apiService.get('/transactions/outgoing/amount', {}).pipe(map((res: { amount: number }) => res.amount));
  }

  public getOutgoingTransactionsTop(): Observable<Transaction[]> {
    return this._apiService.get('/transactions/outgoing/top', {});
  }

  public createTransaction(id_to: string, amount: number, label: string): Observable<Transaction> {
    return this._apiService.post('/transactions', { id_to, amount, label });
  }
}
