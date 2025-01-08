import { createFeature, createReducer, on } from '@ngrx/store'
import { ThemeSettingsInterface } from '../../types/themeSetting.interface'
import { themeSettingsActions } from './action'

// THEME SETTINGS REDUCES
const themeSettingsInitialState: ThemeSettingsInterface = {
  backgroundColor: '#fff',
  theme: 'default',
}

const themeSettingsFeature = createFeature({
  name: 'Theme Settings',
  reducer: createReducer(
    themeSettingsInitialState,
    on(
      themeSettingsActions.themeSettingsUpdateSuccess,
      themeSettingsActions.fetchThemeSettingsSuccess,
      (state, { backgroundColor, theme }) => ({
        ...state,
        backgroundColor,
        theme,
      })
    )
  ),
})

export const {
  name: themeSettingsFeatureKey,
  reducer: themeSettingsReducer,
  selectBackgroundColor,
  selectTheme,
} = themeSettingsFeature
