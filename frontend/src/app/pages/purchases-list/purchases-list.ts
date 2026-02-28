import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PurchaseService } from '../../services/purchase/purchase';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-purchases-list',
  imports: [CommonModule, NgIf],
  templateUrl: './purchases-list.html',
  styleUrl: './purchases-list.css',
})
export class PurchasesList {

 shopId = '698b04d85bfcbccb80e5e06a';
  purchases: any[] = [];
  loading = false;

  constructor(private purchaseService: PurchaseService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.shopId) {
      this.loadPurchases();
    }
  }

  loadPurchases() {
    this.loading = true;
    this.purchaseService.getPurchasesByShop(this.shopId)
      .subscribe({
        next: (data) => {
          this.purchases = data;
          console.log('data', this.purchases);
          this.loading = false;
           this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

}
