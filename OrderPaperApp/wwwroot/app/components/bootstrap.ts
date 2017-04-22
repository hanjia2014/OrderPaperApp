import { platformBrowserDynamic }   from '@angular/platform-browser-dynamic';
import { enableProdMode }           from '@angular/core';
import './rxjs-operators';
import { AppModule }                from './app.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);