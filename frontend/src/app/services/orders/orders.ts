import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://centrecom.up.railway.app/api/orders';
  private validateOrderUrl = 'https://centrecom.up.railway.app/api/orders/validate';

  constructor(private http: HttpClient) {}

  getOrdersByShop(shopId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/shop/${shopId}`);
  }

  validateOrder(orderId: string): Observable<any> {
    return this.http.put(`${this.validateOrderUrl}/${orderId}`, {});
  }

  markAsPaid(orderId: string) {
  return this.http.put(
    `https://centrecom.up.railway.app/api/orders/${orderId}/pay`,
    {}
  );
}

markAsDelivered(orderId: string) {
  return this.http.put(`https://centrecom.up.railway.app/api/orders/${orderId}/deliver`, {});
}

markAsDeliveredByCustomer(orderId: string) {
  return this.http.put(`https://centrecom.up.railway.app/api/orders/${orderId}/delivered`, {});
}
 private refreshNeeded = new Subject<void>();
  refreshNeeded$ = this.refreshNeeded.asObservable();

  notifyRefresh() {
    this.refreshNeeded.next();
  }

getOrdersByCustomer(customerId : string): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.apiUrl}/customer/${customerId}`);
}


}
