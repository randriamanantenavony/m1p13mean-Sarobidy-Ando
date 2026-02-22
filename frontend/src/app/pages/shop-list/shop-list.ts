import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop';
import { ShopService } from '../../services/shop';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { Product } from '../../models/product';
import { LOCALE_ID } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  imports: [NgIf, NgForOf, CommonModule, NavbarComponent],
  templateUrl: './shop-list.html',
  styleUrls: ['./shop-list.css'],
})
export class ShopList implements OnInit {

  shops: Shop[] = [];
  loading = false;
  errorMessage = '';
  selectedShop: Shop | null = null;
  products: Product[] = [];

  selectedCategoryId: string | null = null; // ✅ IMPORTANT

  constructor(private shopService: ShopService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAllShops(); // charge tout au départ
  }

  // 🔹 Charger toutes les boutiques
  loadAllShops(): void {
    this.loading = true;
    this.errorMessage = '';

    this.shopService.getActiveShops().subscribe({
      next: (data) => {
        this.shops = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur chargement boutiques";
        this.loading = false;
      }
    });
  }


loadShopsByCategory(categoryId: string): void {
  console.log("=== DEBUG API CATEGORY ===");
  console.log("ID envoyé au backend :", categoryId);

  this.loading = true;
  this.shops = [];
  this.shopService.getShopsByCategoryId(categoryId).subscribe({
    next: (data) => {
      console.log("Réponse backend :", data);
      console.log("Nombre reçu :", data?.length);

      this.shops = data ?? [];
      this.loading = false;
      this.cdr.detectChanges();
      console.log('loading après API :', this.loading);
    },
    error: (err) => {
      console.error("Erreur API :", err);
      this.loading = false;
      this.cdr.detectChanges();
      console.log('loading après erreur API :', this.loading);
    }
  });
}

  // 🔹 Reçoit l'événement du navbar
  onSelectCategory(categoryId: string) {
    console.log('Catégorie reçue dans ShopList:', categoryId);

    this.selectedCategoryId = categoryId;

    if (categoryId) {
      this.loadShopsByCategory(categoryId);
    } else {
      this.loadAllShops();
    }
  }

  // 🔹 Réinitialiser filtre (optionnel)
  resetFilter() {
    this.selectedCategoryId = null;
    this.loadAllShops();
  }

  // ----------------------------------------------------------------
  // LE RESTE DE TON CODE (inchangé)
  // ----------------------------------------------------------------

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

  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      mode: 'Mode',
      restauration: 'Restauration',
      electronique: 'Électronique',
      beaute: 'Beauté',
      services: 'Services',
      divertissement: 'Divertissement',
    };
    return labels[category] ?? category;
  }

  viewDetailsShop(shopId: string) {
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

  closeModal(): void {
    this.selectedShop = null;
    this.products = [];
  }

  onOverlayClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  getInStockCount(): number {
    return this.products.filter(p => p.status === 'available').length;
  }

  getLowStockCount(): number {
    return this.products.filter(p => p.isLowStock).length;
  }

  addToCart(product: any): void {
    console.log('Ajout panier :', product);
  }
}
