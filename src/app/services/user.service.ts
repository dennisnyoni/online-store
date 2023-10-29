import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../Model/client";
import {User} from "../Model/user";
import {environment} from "../../../environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userBaseUrl:string = environment.userBaseUrl;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (2 seconds)
    });
  }

  getUser(id: number): Observable<any>{
    return this.http.get(`${this.userBaseUrl}/${id}`);
  }

  createUser(user: User): Observable<any>{
    return this.http.post(`${this.userBaseUrl}`, user);
  }

  updateUser(id: number, value: any): Observable<any>{
    return this.http.put(`${this.userBaseUrl}/${id}`,value);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.userBaseUrl}/${id}`,{responseType: 'text'});
  }

  getUserList(): Observable<any>{
    return this.http.get(`${this.userBaseUrl}`);
  }
}
