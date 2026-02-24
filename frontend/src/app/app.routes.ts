import { PromotionComponents } from './pages/promotions/promotions';
import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ShopList } from './pages/shop-list/shop-list';
import { ShopProducts } from './pages/shop-products/shop-products';
import { ShopProductCreate } from './pages/shop-product-create/shop-product-create';

export const routes: Routes = [
    {path : 'login', component : Dashboard},
    {path : 'shop-list', component : ShopList},
    {path : 'products-boutiques', component : ShopProducts},
    {path : 'create-products', component : ShopProductCreate},
    {path :'', redirectTo: '/login', pathMatch : 'full'}
];
