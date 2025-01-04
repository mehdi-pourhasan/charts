import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { UploadDataInterface } from '../../types/uploadData.interface'

// ACTIONS FOR UPLOADING DATA
export const uploadActions = createActionGroup({
  source: 'UPLOAD',
  events: {
    Upload: props<{ request: UploadDataInterface }>(),
    'Upload Success': props<{ response: any }>(),
    'Upload Failure': emptyProps(),
  },
})
