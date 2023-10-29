import { Injectable } from '@angular/core';
import {OrderService} from "./order.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../Model/order";
import {Payment} from "../Model/payment";
import {environment} from "../../../environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentBaseUrl:string = environment.paymentBaseUrl;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (2 seconds)
    });
  }
  getPayment(id: number): Observable<any>{
    return this.http.get(`${this.paymentBaseUrl}/${id}`);
  }

  createPayment(payment: Payment): Observable<any>{
    return this.http.post(`${this.paymentBaseUrl}`, payment);
  }

  updatePayment(id: number, value: any): Observable<any>{
    return this.http.put(`${this.paymentBaseUrl}/${id}`,value);
  }

  deletePayment(id: number): Observable<any>{
    return this.http.delete(`${this.paymentBaseUrl}/${id}`,{responseType: 'text'});
  }

  getPaymentList(): Observable<any>{
    return this.http.get(`${this.paymentBaseUrl}`);
  }
}
