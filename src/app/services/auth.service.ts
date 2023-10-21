import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../Model/user";
import {environment} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authServiceApiUrl = environment.authServiceApiUrl; // Replace with your backend API URL
  private tokenKey = 'auth_token';
  noRole:boolean = false;
  role!: string

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    console.log('token :',this.decodeJwtToken('eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImpkMkBlbWFpbC5jb20iLCJ1c2VySWQiOiJ1c2VyaWR8MiwwIiwicm9sZXMiOiJVc2VyIiwiZmlyc3ROYW1lIjoiam9obiIsImxhc3ROYW1lIjoiZG9lIiwic3ViIjoiamQyQGVtYWlsLmNvbSIsImlhdCI6MTY5NzQ3NzMwMiwiZXhwIjoxNjk3NTQyMTAyfQ.ikogfT-wTvi3uKuSSTt_MTJ4D2-RSRNIusfVSFuLoL8AQjbqzGMcrySZHFyAotLuyj3NOjYWi2r5iBFKEkCSYw'));

    return this.http.post(`${this.authServiceApiUrl}/userlogin`, credentials).pipe(
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

  decodeJwtToken(token: string | null): any {
    try {
      // Decode the JWT token (assuming it's a base64-encoded JSON)
      // @ts-ignore
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      return tokenData;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.authServiceApiUrl}/register`, userData);
  }

  getUserRole() {
    // Implement logic to get the user's role
    return 'CUSTOMER';//this.decodeJwtToken(this.getToken()).role;
  }

  isCustomer(): boolean {

    if(this.getUserRole() === 'CUSTOMER'){
      this.noRole=false;

      return true;
    }else
      return false;

    //this.noRole=false;
    //return this.authService.getUserRole() === 'ROLE_CUSTOMER';
  }

  hasNoRole(){
    return this.noRole;
  }
  isVendor(): boolean {

    if(this.getUserRole() === 'VENDOR'){
      this.noRole=false;
      return true;
    }else
      return false;

    //this.noRole=false;
    //return this.authService.getUserRole() === 'ROLE_VENDOR';
  }

  isAdmin(): boolean {
    if(this.getUserRole() === 'ADMIN'){
      this.noRole=false;
      return true;
    }else
      return false;
  }
}
