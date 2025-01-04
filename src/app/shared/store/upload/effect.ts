import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { BackendDataService } from '../../services/backend-data/backend-data.service'
import { uploadActions } from './action'
import { catchError, map, of, switchMap } from 'rxjs'
import { feedActions } from '../feed/action'

// LISTENS TO ANY UPLOAD ACITONS WHEN DISPATCH FOR SIDE EFFECT

export const UploadEffect = createEffect(
  (actions$ = inject(Actions), backendService = inject(BackendDataService)) => {
    return actions$.pipe(
      ofType(uploadActions.upload),
      switchMap(({ request }) => {
        return backendService.uploadFile(request.file).pipe(
          map((response) => {
            return uploadActions.uploadSuccess({ response })
          }),
          catchError(() => {
            return of(uploadActions.uploadFailure())
          })
        )
      })
    )
  },
  { functional: true }
)
