import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Login } from '../pages/login/login';
import { LotsAssign } from '../pages/lots-assign/lots-assign';
import { LotsList } from '../pages/lots-list/lots-list';
import { Lots } from './pages/lots/lots';

export const routes: Routes = [
    {path : 'login', component : Login},
    {path :'', redirectTo: '/login', pathMatch : 'full'},
    {path : 'client', component : Dashboard},
    {path : 'admin', component : Dashboard},
    {path : 'boutique', component : Dashboard},
    {path : 'lots', component : Lots},
];
