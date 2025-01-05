import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { BackendDataService } from '../../../services/backend-data/backend-data.service'
import { uploadActions } from './action'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { Router } from '@angular/router'

// LISTENS TO ANY UPLOAD ACITONS WHEN DISPATCH FOR SIDE EFFECT
export const UploadEffect = createEffect(
  (actions$ = inject(Actions), backendService = inject(BackendDataService)) => {
    return actions$.pipe(
      ofType(uploadActions.upload),
      switchMap(({ request }) =>
        backendService.uploadFile(request.file).pipe(
          map((response) => {
            console.log('Upload Success:', response) // Add logging
            return uploadActions.uploadSuccess({ response })
          }),
          catchError((error) => {
            console.error('Upload Failure:', error) // Add logging
            return of(uploadActions.uploadFailure())
          })
        )
      )
    )
  },
  { functional: true }
)
export const NavigateOnUploadSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(uploadActions.uploadSuccess),
      tap(() => {
        console.log('Navigating to /info') // Add logging
        router.navigate(['/info'])
      })
    )
  },
  {
    functional: true,
    dispatch: false,
  }
)
