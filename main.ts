import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {NgModel} from '@angular/forms'


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
