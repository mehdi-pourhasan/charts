import { createFeature, createReducer, on } from '@ngrx/store'
import { feedActions } from './action'
import { FeedStateInterface } from '../../shared/types/feed.interface'

// FETCH REDUCERS
const feedInitialState: FeedStateInterface = {
  isLoading: false,
  data: null,
}

const feedFeature = createFeature({
  name: 'FEED',
  reducer: createReducer(
    feedInitialState,
    // TODO SHOULD CHECK
    on(feedActions.fetchFeed, (state) => ({ ...state, isLoading: true })),
    on(feedActions.fetchFeedSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.response.data,
    })),
    on(feedActions.fetchFeed, (state) => ({ ...state, isLoading: false }))
  ),
})

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectData: selectFeedData,
} = feedFeature
