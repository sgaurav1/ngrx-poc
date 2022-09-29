import { createAction, props } from '@ngrx/store';

export const counterCounters = createAction(
  '[Counter] Counter Counters'
);

export const counterCountersSuccess = createAction(
  '[Counter] Counter Counters Success',
  props<{ data: any }>()
);

export const counterCountersFailure = createAction(
  '[Counter] Counter Counters Failure',
  props<{ error: any }>()
);
