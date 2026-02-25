import { PromotionComponents } from './pages/promotions/promotions';
import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ShopList } from './pages/shop-list/shop-list';
import { ShopProducts } from './pages/shop-products/shop-products';
import { ShopProductCreate } from './pages/shop-product-create/shop-product-create';
import { PurchaseFormComponent } from './pages/purchases/purchases';
import { SaleFormComponent } from './pages/sales/sales';

export const routes: Routes = [
    {path : 'login', component : Dashboard},
    {path : 'shop-list', component : ShopList},
    {path : 'products-boutiques', component : ShopProducts},
    {path : 'create-products', component : ShopProductCreate},
    {path : 'purchase', component : PurchaseFormComponent},
    {path : 'sales', component : SaleFormComponent},
    {path :'', redirectTo: '/login', pathMatch : 'full'}
];
