import { RouterModule, Routes } from '@angular/router';
import { MasterComponent }      from './master.component';
import { HomeComponent }        from './home.component';
import { AppSettings }          from '../settings/app.settings';

const appRoutes: Routes = [
    {
        path: '',
        component: MasterComponent       
    },
    {
        path: 'home',
        component: HomeComponent
    },
];

AppSettings.SP_HOST = window.location.search;

export const routing = RouterModule.forRoot(appRoutes);