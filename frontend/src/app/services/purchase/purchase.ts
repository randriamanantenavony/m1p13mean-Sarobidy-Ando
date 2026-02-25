import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private apiUrl = 'http://localhost:5000/api/purchases';

  constructor(private http: HttpClient) {}

  createPurchase(data: Purchase): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getPurchasesByShop(shopId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/shop/${shopId}`);
}


}
