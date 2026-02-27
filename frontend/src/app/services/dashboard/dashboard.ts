import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:5000/api/dashboard';

  constructor(private http: HttpClient) {}

  getKPIs(shopId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/kpi/${shopId}`);
  }
}
