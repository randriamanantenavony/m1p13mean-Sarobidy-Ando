import { PromotionComponents } from './pages/promotions/promotions';
import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ShopList } from './pages/shop-list/shop-list';

export const routes: Routes = [
    {path : 'login', component : Dashboard},
    {path : 'shop-list', component : ShopList},
    {path : 'promotions', component : PromotionComponents},
    {path :'', redirectTo: '/login', pathMatch : 'full'}
];
