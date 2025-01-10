import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { BackendDataService } from '../../services/backend-data/backend-data.service'
import { uploadActions } from './action'
import { map, switchMap, tap } from 'rxjs'
// import { Router } from '@angular/router'

// LISTENS TO ANY UPLOAD ACITONS WHEN DISPATCH FOR SIDE EFFECT
export const UploadEffect = createEffect(
  (
    actions$ = inject(Actions),
    backendService = inject(BackendDataService)
    // router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(uploadActions.upload),
      switchMap(({ file }) =>
        backendService.uploadFile(file).pipe(
          map((response) => {
            console.log('Upload Success:', response) // Log success
            return uploadActions.uploadSuccess({ response })
          })
        )
      )
    )
  },
  { functional: true }
)

// export const NavigateOnSuccessEffect = createEffect(
//   (actions$ = inject(Actions), router = inject(Router)) =>
//     actions$.pipe(
//       ofType(uploadActions.uploadSuccess),
//       tap(() => {
//         router.navigate(['/info']) // Navigate on success
//       })
//     ),
//   { functional: true, dispatch: false } // No action dispatched from this effect
// )
