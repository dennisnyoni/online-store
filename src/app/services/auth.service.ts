import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../Model/user";
import {environment} from "../../../environment";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authServiceApiUrl = environment.authServiceApiUrl; // Replace with your backend API URL
  private tokenKey = 'auth_token';
  noRole:boolean =false;
  role!: string

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (2 seconds)
    });
  }
  login(credentials: { username: string; password: string }): Observable<any> {
    console.log('token :',this.decodeJwtToken('eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImpkMkBlbWFpbC5jb20iLCJ1c2VySWQiOiJ1c2VyaWR8MiwwIiwicm9sZXMiOiJVc2VyIiwiZmlyc3ROYW1lIjoiam9obiIsImxhc3ROYW1lIjoiZG9lIiwic3ViIjoiamQyQGVtYWlsLmNvbSIsImlhdCI6MTY5NzQ3NzMwMiwiZXhwIjoxNjk3NTQyMTAyfQ.ikogfT-wTvi3uKuSSTt_MTJ4D2-RSRNIusfVSFuLoL8AQjbqzGMcrySZHFyAotLuyj3NOjYWi2r5iBFKEkCSYw'));

    return this.http.post(`${this.authServiceApiUrl}/userlogin`, credentials).pipe(
        tap((response: any) => {
          const token = response.token;
          this.setToken(token);
          this.router.navigate(['login']);
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
    //return  localStorage.getItem(this.tokenKey);

    //amin token
    // return 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InRyaS5raG92YW5AZ21haWwuY29tIiwidXNlcklkIjoiMDAxIiwicm9sZXMiOlsiQURNSU4iXSwic3ViIjoidHJpLmtob3ZhbkBnbWFpbC5jb20iLCJpYXQiOjE2OTc5OTYzOTgsImV4cCI6MTY5ODA2MTE5OH0.PXpEwArhyxJcm5nFxv1VuBJwGB_LLY1cm7VICgrG4oHMELaCZGcx4-SRr1BQVtiAlXwSVYwBM86zygW9NtybHQ';

    //vendor token
    return 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InZlbkBlbWFpbC5jb20iLCJ1c2VySWQiOiIxIiwicm9sZSI6IlZFTkRPUiIsImZpcnN0TmFtZSI6ImpvaG4gVGhlIiwibGFzdE5hbWUiOiJWZW5kb3IiLCJjYXJ0SWQiOiIwIiwic3ViIjoidmVuQGVtYWlsLmNvbSIsImlhdCI6MTY5NzgyMTU2NiwiZXhwIjoxNjk3ODg2MzY2fQ.YWT8sS8N3v1fWSo_1k-VyGYGJe-JPAzQwXLnywhNVVycqIllquqx7V9DiYk8Jf79LQ1y1L87tiTBujgidphzCA';
    //return 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImxldmlldHRyaTg4QGdtYWlsLmNvbSIsInVzZXJJZCI6IjAwMSIsInJvbGVzIjpbIlZFTkRPUiJdLCJzdWIiOiJsZXZpZXR0cmk4OEBnbWFpbC5jb20iLCJpYXQiOjE2OTgzNDQ4ODYsImV4cCI6MTY5ODQwOTY4Nn0.nOl1KWrZiFQzIrWyJ4SWscQOMyE1fCiRqGRae0ViFJm_BgYB_BToiiCHCqT1Ucm5BhFnUYRg0sgrr-gxLovwDA';
    //customer token
    //return 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImN1c3RAZW1haWwuY29tIiwidXNlcklkIjoiMiIsInJvbGUiOiJDVVNUT01FUiIsImZpcnN0TmFtZSI6IlVzZXIiLCJsYXN0TmFtZSI6IkN1c3RvbWVyIiwiY2FydElkIjoiMSIsInN1YiI6ImN1c3RAZW1haWwuY29tIiwiaWF0IjoxNjk3ODIxNTc3LCJleHAiOjE2OTc4ODYzNzd9.VEo_YYiTZED9Cb8AbZYU_ez0pQCTRJZmje3mp8iRyAptZIkRBqn0OCPCUkQQz4_EVU9QYQ6M2OL_KhnlOt9uQg';
    //return 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImxldmlldHRyaTg4QGdtYWlsLmNvbSIsInVzZXJJZCI6IjAwMSIsInJvbGVzIjpbIkNVU1RPTUVSIl0sInN1YiI6ImxldmlldHRyaTg4QGdtYWlsLmNvbSIsImlhdCI6MTY5ODM0NDg1NiwiZXhwIjoxNjk4NDA5NjU2fQ.oC8dXUU7U1LzBbiaZC6Caf1vjEiR6HdRCNxX3eD4aZMaPoLcmGSfaUGzfMTnAqKGvuF6GKFU5JI6pARsoyYvyw';
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
    return this.decodeJwtToken(this.getToken()).role;
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
