import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.baseUrl, { email, password }).pipe(
      tap(res => {
        if (res.token && typeof window !== 'undefined') {
          localStorage.setItem('token', res.token); // stocke le token
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getShopId(): string | null {
    return localStorage.getItem('shopId');
  }

 logout(): void {
    localStorage.clear();      // supprime token, shopId, etc.
    this.router.navigate(['/login']); // redirige automatiquement
  }
}
