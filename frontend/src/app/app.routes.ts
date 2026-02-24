import { PromotionComponents } from './pages/promotions/promotions';
import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ShopList } from './pages/shop-list/shop-list';
import { UserFavorites } from './pages/user-favorites/user-favorites';

export const routes: Routes = [
    {path : 'login', component : Dashboard},
    {path : 'shop-list', component : ShopList},
    {path : 'fav', component : UserFavorites},
    {path :'', redirectTo: '/login', pathMatch : 'full'}
];
