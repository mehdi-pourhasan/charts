import { createActionGroup, emptyProps, props } from '@ngrx/store'

// ACTION FOR THEME SETTINGS
export const themeSettingsActions = createActionGroup({
  source: '[THEME SETTINGS]',
  events: {
    // TO SET
    themeSettingsUpdate: props<{
      backgroundColor: string
      theme: string
    }>(),
    themeSettingsUpdateSuccess: props<{
      backgroundColor: string
      theme: string
    }>(),
    // TO GET
    fetchThemeSettings: emptyProps(),
    fetchThemeSettingsSuccess: props<{
      backgroundColor: string
      theme: string
    }>(),
  },
})
