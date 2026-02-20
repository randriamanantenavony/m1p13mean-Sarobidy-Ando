import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop';
import { ShopService } from '../../services/shop';
import { CommonModule } from '@angular/common';
import { NgIf, NgForOf } from '@angular/common';
import { Product } from '../../models/product';
import { LOCALE_ID } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar";
import { lastValueFrom } from 'rxjs';



@Component({
  selector: 'app-shop-list',
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  imports: [NgIf, NgForOf, CommonModule, NavbarComponent],
  templateUrl: './shop-list.html',
  styleUrls: ['./shop-list.css'], // <-- note le 's' !
})
export class ShopList implements OnInit {
  shops: Shop[] = [];
  loading = false;
  errorMessage = '';
  selectedShop: Shop | null = null;
  products: Product[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadShop();
  }
  
loadShop(): void {
  this.loading = true;

  this.shopService.getActiveShops().subscribe({
    next: (data) => {
      this.shops = data ?? [];
      console.log('Shops chargés:', this.shops);
      console.log('Longueur des shops:', this.shops.length);
      this.loading = false; // Angular détecte automatiquement
    },
    error: (err) => {
      console.error('Erreur récupération boutiques:', err);
      this.shops = [];
      this.loading = false;
    }
  });
}


// ─────────────────────────────────────────────────────
// À coller dans ton shop-list.component.ts
// ─────────────────────────────────────────────────────

// Icône emoji par catégorie
getCategoryIconFromShop(shop: Shop | null): string {
  const categoryName = shop?.categoryId?.name;
  const icons: Record<string, string> = {
    mode: '👗',
    restauration: '🍽️',
    electronique: '💻',
    beaute: '💄',
    services: '🏦',
    divertissement: '🎬',
  };
  return categoryName ? icons[categoryName] ?? '🏪' : '🏪';
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

// closeModal() {
//   this.selectedShop = null;
// }


// Ferme le modal
closeModal(): void {
  this.selectedShop = null;
  this.products = [];
}

// Ferme si on clique sur l'overlay (pas sur le panel)
onOverlayClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  if (target.classList.contains('modal-overlay')) {
    this.closeModal();
  }
}

// Nombre de produits en stock
getInStockCount(): number {
  return this.products.filter(p => p.status === 'available').length;
}

// Nombre de produits en stock faible
getLowStockCount(): number {
  return this.products.filter(p => p.isLowStock).length;
}

// Ajouter au panier — branche ta logique ici
addToCart(product: any): void {
  // Exemple : this.cartService.add(product);
  console.log('Ajout panier :', product);

  // Petit feedback visuel optionnel (toast, animation, etc.)
}

}
