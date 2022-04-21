import { Action, createReducer, on } from '@ngrx/store';
import { IAppConfig } from '..';
import { login, logout, setUserData } from '../actions/app-config.actions';

export const reducer = createReducer(
  { isLogin: false, id: '', email: '', firstName: '', lastName: '' },
  on(login, (state: IAppConfig) => ({
    ...state,
    isLogin: true,
  })),
  on(setUserData, (state: IAppConfig, { id, email, firstName, lastName }) => ({
    ...state,
    id,
    email,
    firstName,
    lastName,
  })),
  on(logout, (state: IAppConfig) => ({ ...state, isLogin: false }))
);

export const AppReducer = (state: IAppConfig, action: Action): IAppConfig => reducer(state, action);
