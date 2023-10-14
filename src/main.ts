import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule} from "./app/app-routing.module";
import { AppModule } from './app/app.module';
import {provideRouter} from "@angular/router";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
