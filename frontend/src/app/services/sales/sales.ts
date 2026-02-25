import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = 'http://localhost:5000/api/sales';

  constructor(private http: HttpClient) {}

  // Créer une vente
  createSale(saleData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, saleData);
  }

  // Récupérer toutes les ventes (optionnel)
  getSalesByShop(shopId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?shopId=${shopId}`);
  }

  // Récupérer une vente par ID (optionnel)
  getSaleById(saleId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${saleId}`);
  }
}
