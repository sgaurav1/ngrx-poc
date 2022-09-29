import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auction-types';
import { User } from '../models/user.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined
}

export const initialState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginAction,(state,action:any)=>{
    console.log(action.user)
    return {
      user: action.user
    }
  })
);
