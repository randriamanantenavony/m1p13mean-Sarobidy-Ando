import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop';
import { ShopService } from '../../services/shop';
import { CommonModule } from '@angular/common';
import { NgIf, NgForOf } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './shop-list.html',
  styleUrls: ['./shop-list.css'], // <-- note le 's' !
})
export class ShopList implements OnInit {
  shops: Shop[] = [];
  loading = true;
  errorMessage = '';
  selectedShop: Shop | null = null;
  products: Product[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    console.log('Coucou');
    this.loadShop();
  }

 loadShop() {
  console.log('Avant appel service, shops =', this.shops);
  this.shopService.getActiveShops().subscribe({
    next: (data) => {
      console.log('Données reçues:', data);
      this.shops = data ?? [];
      console.log('Après assignation, shops =', this.shops);
      this.loading = false;
    },
    error: (error) => {
      console.error('Erreur service:', error);
      this.shops = [];
      this.loading = false;
    }
  });
  console.log('Après subscription, shops =', this.shops);
}


// ─────────────────────────────────────────────────────
// À coller dans ton shop-list.component.ts
// ─────────────────────────────────────────────────────

// Icône emoji par catégorie
getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    mode:           '👗',
    restauration:   '🍽️',
    electronique:   '💻',
    beaute:         '💄',
    services:       '🏦',
    divertissement: '🎬',
  };
  return icons[category] ?? '🏪';
}

// Label lisible par catégorie
getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    mode:           'Mode',
    restauration:   'Restauration',
    electronique:   'Électronique',
    beaute:         'Beauté',
    services:       'Services',
    divertissement: 'Divertissement',
  };
  return labels[category] ?? category;
}


viewDetailsShop(shopId: string) {
  console.log("Shop id:", shopId);

  // Récupérer les détails de la boutique
  this.shopService.getShopById(shopId).subscribe({
    next: (data) => {
      this.selectedShop = data;

      // Récupérer les produits de la boutique
    this.shopService.getProductsByShop(shopId).subscribe({
      next: (productsData) => {
        this.products = productsData.map(p => ({
          ...p,
          price: Number(p.price)
        }));
      },
      error: (err) => {
        console.error('Erreur récupération produits:', err);
        this.products = [];
      }
    });


    },
    error: (error) => {
      console.error('Erreur service:', error);
      this.selectedShop = null;
      this.products = [];
    }
  });
}

closeModal() {
  this.selectedShop = null;
}

}
