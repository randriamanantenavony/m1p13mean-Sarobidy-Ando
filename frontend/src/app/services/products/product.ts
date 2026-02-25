import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductCreate } from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProductsByShop(shopId: string) {
  return this.http.get<Product[]>(`${this.apiUrl}/shop/${shopId}`);
}

 updateProduct(productId: string, data: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/${productId}`,
      data
    );
  }


  createProduct(data: ProductCreate) {
  return this.http.post<Product>(`${this.apiUrl}/`, data);
}


}
