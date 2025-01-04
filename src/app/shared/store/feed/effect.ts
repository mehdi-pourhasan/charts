import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { BackendDataService } from '../../services/backend-data/backend-data.service'
import { feedActions } from './action'
import { catchError, map, of, switchMap } from 'rxjs'

// LISTENS TO ANY FEED ACITONS WHEN DISPATCH FOR SIDE EFFECT
export const FeedEffect = createEffect(
  (actions$ = inject(Actions), backendService = inject(BackendDataService)) => {
    return actions$.pipe(
      ofType(feedActions.fetchFeed),
      switchMap(() => {
        return backendService.getData().pipe(
          map((response) => {
            return feedActions.fetchFeedSuccess({
              response: { data: response },
            })
          }),
          catchError(() => {
            return of(feedActions.fetchFeedFailure())
          })
        )
      })
    )
  },
  { functional: true }
)
