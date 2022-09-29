import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";


export const loginAction = createAction(
    'User Login',
    props<{user: User | undefined}>()
)