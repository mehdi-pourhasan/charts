import { createActionGroup, props } from '@ngrx/store'

// ACTIONS FOR UPLOADING DATA
export const uploadActions = createActionGroup({
  source: 'UPLOAD',
  events: {
    Upload: props<{ file: File }>(),
    'Upload Success': props<{ response: any }>(),
  },
})
