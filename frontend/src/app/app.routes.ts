import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';

export const routes: Routes = [
    {path : 'login', component : Dashboard},
    {path :'', redirectTo: '/login', pathMatch : 'full'}
];
