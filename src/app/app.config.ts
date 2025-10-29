import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideHttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

 // ✅ registra o locale pt-BR

import { routes } from './app.routes';

registerLocaleData(localePt)

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(MatCardModule),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'pt-BR' } // ✅ define o locale padrão
  ]
};
