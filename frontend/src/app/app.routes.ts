import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { Lots } from './pages/lots/lots';

export const routes: Routes = [
    {path : 'login', component : Login},
    {path :'', redirectTo: '/login', pathMatch : 'full'},
    {path : 'client', component : Lots},
    {path : 'admin', component : Lots},
    {path : 'boutique', component : Lots},
    {path : 'lots', component : Lots},
];
