import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'localhost:8881/validation/'; // Replace with your backend API URL
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/userlogin`, credentials).pipe(
        tap((response: any) => {
          const token = response.token;
          this.setToken(token);
        })
    );
  }

  logout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  decodeJwtToken(token: string): any {
    try {
      // Decode the JWT token (assuming it's a base64-encoded JSON)
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      return tokenData;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getUserRole() {
    // Implement logic to get the user's role
    return 'customer'; // Replace with actual role retrieval logic
  }
}
