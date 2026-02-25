import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { Promotion, PromotionService } from './../../services/promotions/promotion';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ElementRef, Inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ShopService } from '../../services/shop';
import { ListPromotions } from '../list-promotions/list-promotions';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, NgIf, NgForOf, ListPromotions],
  templateUrl: './promotions.html',
  styleUrl: './promotions.css',
})
export class PromotionComponents implements OnInit , OnDestroy {

  @Output() close = new EventEmitter<void>();
  @Output() promotionsloaded = new EventEmitter<void>();

  promotions: Promotion[] = [];
  loading = false;
  errorMessage = '';
  selectedShop: any = null;
  products: any[] = [];

  constructor(private promotionService: PromotionService, private cdr: ChangeDetectorRef, private ElementRef: ElementRef,  @Inject(DOCUMENT) private document: Document, private shopService: ShopService) {}

  ngOnInit(): void {
    console.log('Initialisation du composant promotions');
    this.document.body.appendChild(this.ElementRef.nativeElement); // Assure que le composant est au-dessus du plan du centre commercial
    this.document.body.style.overflow = 'hidden'; // Empêche le scroll du fond
    this.loadPromotions();
  }

  ngOnDestroy(): void {
    this.ElementRef.nativeElement.remove(); // Nettoie le DOM
    this.document.body.style.overflow = 'auto'; // Restaure le scroll du fond
  }

  loadPromotions(): void {
    console.log('Chargement des promotions...');
    this.loading = true;
    this.promotionService.getActivePromotions().subscribe({
      next: (data) => {
        this.promotions = data;
        console.log('Promotions reçues:', this.promotions);
        this.promotionsloaded.emit();
        this.loading = false;
        this.cdr.detectChanges();
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

  viewDetailsShop(shopId: string) {
    console.log('Affichage des détails de la boutique avec ID :', shopId);
    this.shopService.getShopById(shopId).subscribe({
      next: (data) => {
        this.selectedShop = data;

        this.shopService.getProductsByShop(shopId).subscribe({
          next: (productsData) => {
            this.products = productsData.map(p => ({
              ...p,
              price: Number(p.price)
            }));
          },
          error: () => {
            this.products = [];
          }
        });
      },
      error: () => {
        this.selectedShop = null;
        this.products = [];
      }
    });
  }


}
