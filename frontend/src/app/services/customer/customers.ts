import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class Customers {

   private apiUrl = 'http://localhost:5000/api/customers';

  constructor(private http: HttpClient) {}

  getCustomersByShop(shopId: string) {
  return this.http.get<Product[]>(`${this.apiUrl}/shop/${shopId}`);
}
}
