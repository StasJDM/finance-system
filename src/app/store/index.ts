import { ActionReducerMap } from '@ngrx/store';
import { reducer } from './reducers/app-config.reducers';

export interface IAppConfig {
  isLogin: boolean;
}

export interface IAppState {
  appConfig: IAppConfig;
}

export const reducers: ActionReducerMap<IAppState> = {
  appConfig: reducer,
};
