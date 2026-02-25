import { NgFor, NgIf } from '@angular/common';
// pages/orders/list-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/orders/orders';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.html',
  imports: [CommonModule, NgIf ,NgFor],
  styleUrls: ['./list-orders.css'],
})
export class ListOrdersComponent implements OnInit {

  orders: any[] = [];
  loading = false;
  shopId = '698b04d85bfcbccb80e5e06a';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getOrdersByShop(this.shopId)
      .subscribe({
        next: (data) => {
          // calculer totalQuantity pour chaque commande
          this.orders = data.map(order => ({
            ...order,
            totalQuantity: order.products.reduce((sum: number, p: any) => sum + p.quantity, 0)
          }));
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur récupération commandes', err);
          this.loading = false;
        }
      });
  }

  validateOrder(orderId: string) {
    if (!confirm('⚠️ Voulez-vous vraiment valider cette commande ?')) return;
    this.orderService.validateOrder(orderId)
      .subscribe({
        next: () => {
          alert('Commande validée ✅');
          this.loadOrders(); // auto-refresh
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de la validation');
        }
      });
  }
}
