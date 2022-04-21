import { createAction, props } from '@ngrx/store';

export enum EAppConfigActions {
  Login = '[App Config] Login',
  Logout = '[App Config] Logout',
  SetUserData = '[App Config] Set user data',
}

export const login = createAction(EAppConfigActions.Login);
export const logout = createAction(EAppConfigActions.Logout);
export const setUserData = createAction(
  EAppConfigActions.SetUserData,
  props<{ id: string; email: string; firstName: string; lastName: string }>()
);
