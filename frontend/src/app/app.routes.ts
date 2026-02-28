import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ShopList } from './pages/shop-list/shop-list';
import { ShopProducts } from './pages/shop-products/shop-products';
import { ShopProductCreate } from './pages/shop-product-create/shop-product-create';
import { PurchaseFormComponent } from './pages/purchases/purchases';
import { SaleFormComponent } from './pages/sales/sales';
import { PromotionFormComponent } from './pages/create-promotions/create-promotions';
import { ListPromotions } from './pages/list-promotions/list-promotions';
import { ListOrdersComponent } from './pages/list-orders/list-orders';
import { Notifications } from './pages/notifications/notifications';
import { ShopNavbarComponent } from './pages/navbar-boutique/navbar-boutique';
import { DashboardBoutique } from './pages/dashboard/dashboard';
import { BoutiqueMain } from './pages/boutique-main/boutique-main';
import { LoginBoutique } from './pages/login-boutique/login-boutique';
import { AuthGuard } from './guards/guard';

export const routes: Routes = [
    {path : 'shop-list', component : ShopList},
    {path: 'login',component: LoginBoutique},
    {path : 'products-boutiques', component : ShopProducts, canActivate: [AuthGuard]},
    {path : 'create-products', component : ShopProductCreate, canActivate: [AuthGuard]},
    {path : 'purchase', component : PurchaseFormComponent, canActivate: [AuthGuard]},
    {path : 'sales', component : SaleFormComponent, canActivate: [AuthGuard]},
    {path : 'promo', component :  PromotionFormComponent, canActivate: [AuthGuard]},
    {path : 'liste-promo', component : ListPromotions},
    {path : 'liste-notif', component : Notifications},
    {path : 'liste-order', component : ListOrdersComponent, canActivate: [AuthGuard]},
    {path : 'navbar', component : ShopNavbarComponent, canActivate: [AuthGuard]},
    {path : 'dashboard', component : DashboardBoutique, canActivate: [AuthGuard]},
    {path : 'boutique/main', component : BoutiqueMain, canActivate: [AuthGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
  ];
