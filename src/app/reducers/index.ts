import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { User } from '../auth/models/user.model';


export interface AppState {
  // user: User | undefined
}

export const initialState: AppState= {
  // user: undefined
}

export const reducers: ActionReducerMap<AppState> = {

};


// export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
