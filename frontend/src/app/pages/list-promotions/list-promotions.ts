import { Component, Input, OnInit } from '@angular/core';
import { PromotionService } from '../../services/promotions/promotion';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-promotions',
  imports: [CommonModule],
  templateUrl: './list-promotions.html',
  styleUrl: './list-promotions.css',
})
export class ListPromotions implements OnInit {

  @Input() promotions: any[] = [];
  loading = true;
  shopId = '698b04d85bfcbccb80e5e06a'; 

  constructor(private promoService: PromotionService) {}

  ngOnInit(): void {
    console.log('Coucou');
    this.loadPromotions();
  }

  loadPromotions() {
    this.loading = true;

    this.promoService.getPromotionsByShop(this.shopId)
      .pipe(
        map(data => data.sort(
          (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        ))
      )
      .subscribe({
        next: res => {
          this.promotions = res;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  getStatus(promo: any): string {
    const now = new Date();
    return new Date(promo.endDate) < now ? 'expired' : 'active';
  }

  deletePromotion(id: string) {
    const confirmDelete = window.confirm('Supprimer cette promotion ?');
    if (!confirmDelete) return;

    this.promoService.deletePromotion(id).subscribe(() => {
      this.loadPromotions();
    });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }
}
