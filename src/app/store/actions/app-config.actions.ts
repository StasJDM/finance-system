import { createAction, props } from '@ngrx/store';

export enum EAppConfigActions {
  Login = '[App Config] Login',
  Logout = '[App Config] Logout',
}

export const login = createAction(
  EAppConfigActions.Login,
  props<{ id: string; email: string; first_name: string; last_name: string }>()
);
export const logout = createAction(EAppConfigActions.Logout);
