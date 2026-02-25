import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';
  private validateOrderUrl = 'http://localhost:5000/api/orders/validate';

  constructor(private http: HttpClient) {}

  getOrdersByShop(shopId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/shop/${shopId}`);
  }

  validateOrder(orderId: string): Observable<any> {
    return this.http.put(`${this.validateOrderUrl}/${orderId}`, {});
  }
}
