import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = 'https://centrecom.up.railway.app/api/suppliers';

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}


