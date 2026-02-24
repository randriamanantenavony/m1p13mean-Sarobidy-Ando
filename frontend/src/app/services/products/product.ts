import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProductsByShop(shopId: string) {
  return this.http.get<Product[]>(`${this.apiUrl}/shop/${shopId}`);
}

updateProduct(shopId : string){
 return this.http.put
}



}
