import { ActionReducerMap } from '@ngrx/store';
import { reducer } from './reducers/app-config.reducers';

export interface IAppConfig {
  isLogin: boolean;
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface IAppState {
  appConfig: IAppConfig;
}

export const reducers: ActionReducerMap<IAppState> = {
  appConfig: reducer,
};
