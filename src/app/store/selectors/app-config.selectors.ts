import { createSelector } from '@ngrx/store';
import { IAppConfig, IAppState } from '..';

const appConfigState = (state: any): IAppConfig => state.appConfig;

export const selectIsLogin = createSelector(appConfigState, (state) => state.isLogin);
