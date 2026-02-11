import { ApplicationConfig, InjectionToken, ValueProvider } from '@angular/core';

export const APP_TITLE = new InjectionToken<string>('app title');
export const appTitleProvider: ValueProvider = {
  provide: APP_TITLE,
  useValue: 'Bienvenue sur Zenika Ecommerce',
};
