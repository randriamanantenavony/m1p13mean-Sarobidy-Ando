// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { authInterceptor } from './app/guards/auth.interceptor';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    ...(appConfig.providers || [])
  ]
})
.catch((err) => console.error(err));
