import { Action, createReducer, on } from '@ngrx/store';
import { IAppConfig } from '..';
import { login, logout } from '../actions/app-config.actions';

export const reducer = createReducer(
  { isLogin: false },
  on(login, (state: IAppConfig) => ({ ...state, isLogin: true })),
  on(logout, (state: IAppConfig) => ({ ...state, isLogin: false }))
);

export const AppReducer = (state: IAppConfig, action: Action): IAppConfig => reducer(state, action);
