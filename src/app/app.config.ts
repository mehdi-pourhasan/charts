import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n'
import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, provideHttpClient } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideState, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideRouterStore, routerReducer } from '@ngrx/router-store'

registerLocaleData(en)

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
}
