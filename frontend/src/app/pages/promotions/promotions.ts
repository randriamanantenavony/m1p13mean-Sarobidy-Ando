import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { Promotion, PromotionService } from './../../services/promotions/promotion';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, NgIf, NgForOf],
  templateUrl: './promotions.html',
  styleUrl: './promotions.css',
})
export class Promotions {

  @Output() close = new EventEmitter<void>();

  promotions: Promotion[] = [];
  loading = false;
  errorMessage = '';

  constructor(private promotionService: PromotionService) {}

  ngOninit(): void {
    this.loadPromotions();
  }

  loadPromotions(): void {
    console.log('Chargement des promotions...');
    this.loading = true;
    this.promotionService.getActivePromotions().subscribe({
      next: (data) => {
        this.promotions = data;
        console.log('Promotions reçues:', this.promotions);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur récupération promotions:', err);
        this.errorMessage = 'Impossible de charger les promotions.';
        this.loading = false;
      }
    });
  }

  closeModal(){
    this.close.emit();
  }

}
