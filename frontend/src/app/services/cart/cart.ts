import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddToCartRequest, Cart } from '../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:5000/api/cart';

  constructor(private http: HttpClient) {}

  addToCart(data: AddToCartRequest): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/add`, data);
  }
}
