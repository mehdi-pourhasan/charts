import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { getFeedResponseInterface } from '../../shared/types/getFeedResponse.interface'

// ACTIONS FOR FETCH DATA FROM SERVER
export const feedActions = createActionGroup({
  source: 'FEED',
  events: {
    'Fetch Feed': emptyProps(),
    'Fetch Feed Success': props<{ response: getFeedResponseInterface }>(),
    'Fetch Feed Failure': emptyProps(),
  },
})
