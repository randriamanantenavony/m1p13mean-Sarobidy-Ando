import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'https://centrecom.up.railway.app/api/categories_products';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
