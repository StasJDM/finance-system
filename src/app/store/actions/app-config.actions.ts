import { createAction } from '@ngrx/store';

export enum EAppConfigActions {
  Login = '[App Config] Login',
  Logout = '[App Config] Logout',
}

export const login = createAction(EAppConfigActions.Login);
export const logout = createAction(EAppConfigActions.Logout);
