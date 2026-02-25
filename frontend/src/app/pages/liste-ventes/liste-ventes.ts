import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { map } from 'rxjs/operators';
import { SalesService } from '../../services/sales/sales';

@Component({
  selector: 'app-liste-ventes',
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './liste-ventes.html',
  styleUrl: './liste-ventes.css',
})
export class SalesListComponent implements OnInit {

  sales: any[] = [];
  loading = true;
  shopId = '698b04d85bfcbccb80e5e06a'; // id de la boutique actuelle

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.loading = true;
    this.salesService.getSalesByShop(this.shopId)
      .pipe(
        map(sales => sales.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())) // tri par date desc
      )
      .subscribe({
        next: data => {
          this.sales = data;
          this.loading = false;
        },
        error: err => {
          console.error('Erreur récupération ventes:', err);
          this.loading = false;
        }
      });
  }
  formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }
}
