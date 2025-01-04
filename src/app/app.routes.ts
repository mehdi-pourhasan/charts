import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/upload-file/upload-file.component').then(
        (m) => m.UploadFileComponent
      ),
  },
  {
    path: 'info',
    loadComponent: () =>
      import('./shared/components/tabs/tabs.component').then(
        (m) => m.TabsComponent
      ),
  },
]
