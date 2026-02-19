import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Shop } from '../models/shop';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {

  private url = "http://localhost:5000/api/shops";

  constructor(private http: HttpClient) { }

getActiveShops(): Observable<Shop[]> {
  return this.http.get<any[]>(`${this.url}/active`).pipe(
    map(data =>
      data.map(d => ({
        id: d._id,
        name: d.name,
        floor : d.floor,
        category: d.category,
        unitNumber: d.unitNumber,
        phone: d.phone,
        email: d.email,
        website: d.website || '',          // valeurs par défaut
        openingHours: d.openingHours || '',
        description: d.description || '',
        imageUrl: d.imageUrl || ''
      }))
    )
  );
}
  getShopById(id: string) {
    return this.http.get<Shop>(`${this.url}/${id}`);
  }

  getProductsByShop(shopId: string) {
  return this.http.get<Product[]>(`http://localhost:5000/api/products/shop/${shopId}`);
}

}
