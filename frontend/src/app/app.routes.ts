import { PromotionComponents } from './pages/promotions/promotions';
import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ShopList } from './pages/shop-list/shop-list';
import { UserFavorites } from './pages/user-favorites/user-favorites';
import { ShopProducts } from './pages/shop-products/shop-products';

export const routes: Routes = [
    {path : 'login', component : Dashboard},
    {path : 'shop-list', component : ShopList},
    {path : 'products-boutiques', component : ShopProducts},
    {path :'', redirectTo: '/login', pathMatch : 'full'}
];
