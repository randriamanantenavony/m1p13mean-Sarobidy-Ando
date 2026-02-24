import { ProductService } from './../../services/products/product';
import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-shop-products',
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './shop-products.html',
  styleUrl: './shop-products.css',
})
export class ShopProducts {

shopId! : string;
products : Product[] = [];
loading = false;
  ngOnInit(){
    this.shopId = '698b04d85bfcbccb80e5e06a';
    this.loadProducts();
  }
constructor(private productService : ProductService){}

  loadProducts() {
  this.loading = true;

  this.productService.getProductsByShop(this.shopId).subscribe({
    next: (data) => {
      this.products = data;
      console.log('data');
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
    }
  });
}

editProduct(productId: string) {
  console.log('méthode appelée');
  // this.router.navigate(['/edit-product', productId]);
}

deleteProduct(arg0: any) {
throw new Error('Method not implemented.');
}


}
