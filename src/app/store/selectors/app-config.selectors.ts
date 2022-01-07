import { createSelector } from '@ngrx/store';
import { IAppConfig, IAppState } from '..';

const appConfigState = (state: any): IAppConfig => state.appConfig;

export const selectIsLogin = createSelector(appConfigState, (state) => state.isLogin);
export const selectUserInfo = createSelector(appConfigState, (state) => ({
  id: state.id,
  firstName: state.first_name,
  lastName: state.last_name,
  email: state.email,
}));
