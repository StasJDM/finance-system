import { Action, createReducer, on } from '@ngrx/store';
import { IAppConfig } from '..';
import { login, logout } from '../actions/app-config.actions';

export const reducer = createReducer(
  { isLogin: false, id: '', email: '', first_name: '', last_name: '' },
  on(login, (state: IAppConfig, { id, email, first_name, last_name }) => ({
    ...state,
    isLogin: true,
    id,
    email,
    first_name,
    last_name,
  })),
  on(logout, (state: IAppConfig) => ({ ...state, isLogin: false }))
);

export const AppReducer = (state: IAppConfig, action: Action): IAppConfig => reducer(state, action);
