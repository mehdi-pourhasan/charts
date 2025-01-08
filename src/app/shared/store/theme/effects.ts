import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { themeSettingsActions } from './action'
import { map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectBackgroundColor, selectTheme } from './reducer'

// LISTEN TO ANY THEME SETTING UPDATE ACTIONS WHEN DISPACHED
export const themeUpdateEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(themeSettingsActions.themeSettingsUpdate),
      mergeMap(({ backgroundColor, theme }) =>
        of({ backgroundColor, theme }).pipe(
          map((themeData) =>
            themeSettingsActions.themeSettingsUpdateSuccess(themeData)
          )
        )
      )
    )
  },
  { functional: true }
)

// LISTEN TO ANY ACTION TO GET THEME SETTINGS WHEN DISPATCHED
export const themeFetchEffect = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(themeSettingsActions.fetchThemeSettings),
      withLatestFrom(
        store.select(selectBackgroundColor),
        store.select(selectTheme)
      ),
      map(([_, backgroundColor, theme]) =>
        themeSettingsActions.fetchThemeSettingsSuccess({
          backgroundColor,
          theme,
        })
      )
    )
  },
  { functional: true }
)
