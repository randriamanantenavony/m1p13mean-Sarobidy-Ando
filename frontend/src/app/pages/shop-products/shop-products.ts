import { ProductService } from './../../services/products/product';
import { Component,ChangeDetectorRef } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopNavbarComponent } from '../navbar-boutique/navbar-boutique';

@Component({
  selector: 'app-shop-products',
  imports: [CommonModule, NgIf, NgFor, FormsModule,ShopNavbarComponent],
  templateUrl: './shop-products.html',
  styleUrls: ['./shop-products.css'],
})
export class ShopProducts {

  shopId!: string;
  products: Product[] = [];
  loading = false;

  // Pour modal édition
  selectedProduct!: Product | null;
  isEditModalOpen = false;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.shopId = '698b04d85bfcbccb80e5e06a';
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;

    this.productService.getProductsByShop(this.shopId).subscribe({
      next: (data) => {
        this.products = data;
        console.log('Produits chargés', data);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Ouvrir la modal pré-remplie
  editProduct(product: Product) {
    this.selectedProduct = { ...product }; // copie pour éviter modif directe
    this.isEditModalOpen = true;
  }

  closeModal() {
    this.isEditModalOpen = false;
    this.selectedProduct = null;
  }

  submitUpdate() {
    if (!this.selectedProduct) return;

    // Appel service pour update
    this.productService.updateProduct(
      this.selectedProduct._id,
      {
        price: this.selectedProduct.price,
        stock: this.selectedProduct.stock,
        status: this.selectedProduct.status
      }
    ).subscribe({
      next: (updatedProduct) => {
        // mettre à jour la liste locale
        const index = this.products.findIndex(p => p._id === updatedProduct._id);
        if (index !== -1) this.products[index] = updatedProduct;

        this.closeModal();
      },
      error: (err) => console.error(err)
    });
  }

  // Supprimer produit
  deleteProduct(productId: string) {
    // if (!confirm('Supprimer ce produit ?')) return;

    // this.productService.deleteProduct(productId).subscribe({
    //   next: () => {
    //     this.products = this.products.filter(p => p._id !== productId);
    //   },
    //   error: (err) => console.error(err)
    // });
  }

}
