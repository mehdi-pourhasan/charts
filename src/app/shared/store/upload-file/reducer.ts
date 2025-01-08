import { createFeature, createReducer, on } from '@ngrx/store'
import { UploadStateInterface } from '../../types/upload.inteface'
import { uploadActions } from './action'

// UPLOAD REDUCERS
const uploadInitialState: UploadStateInterface = {
  isSubmitting: false,
}

const uploadFeature = createFeature({
  name: 'UPLOAD',
  reducer: createReducer(
    uploadInitialState,
    on(uploadActions.upload, (state) => ({ ...state, isSubmitting: true })),
    on(uploadActions.uploadSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    }))
  ),
})

export const {
  name: uploadFeatureKey,
  reducer: uploadReducer,
  selectIsSubmitting,
} = uploadFeature
