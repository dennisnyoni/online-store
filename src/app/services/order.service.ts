import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../Model/client";
import {Order} from "../Model/order";
import {environment} from "../../../environment";
import {ShoppingCartService} from "./shopping-cart.service";
import {AuthService} from "./auth.service";
import {ShoppingCart} from "../Model/shopping-cart";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderBaseUrl:string = environment.orderBaseUrl;
  order!: Order;
  constructor(private http: HttpClient, private shoppingCartService: ShoppingCartService, private authService: AuthService, private snackBar: MatSnackBar) { }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (2 seconds)
    });
  }
  getOrder(id: number): Observable<any>{
    return this.http.get(`${this.orderBaseUrl}/${id}`);
  }

  createOrder(order: Order): Observable<any>{
    return this.http.post(`${this.orderBaseUrl}`, order);
  }

  createCart(shoppingCart: ShoppingCart): Observable<any>{
    return this.http.post(`${this.orderBaseUrl}/cart`, shoppingCart);
  }

  updateOrder(id: number, value: any): Observable<any>{
    return this.http.put(`${this.orderBaseUrl}/${id}`,value);
  }

  deleteOrder(id: number): Observable<any>{
    return this.http.delete(`${this.orderBaseUrl}/${id}`,{responseType: 'text'});
  }

  getOrderList(): Observable<any>{
    return this.http.get(`${this.orderBaseUrl}`);
  }

  makeAnOrder(email: string){
    this.order = new Order();
    this.order.items = this.shoppingCartService.getCartItems()
    this.order.orderStatus = 'PENDING';
    this.order.orderedDate = new Date();
    this.order.totalQuantity = this.shoppingCartService.getTotalItems();
    this.order.total = this.shoppingCartService.calculateTotal();
    this.order.paymentStatus = 'PENDING';
    if(this.authService.getUserRole()){
      this.order.userEmail = this.authService.decodeJwtToken(this.authService.getToken()).email;
    }else{
      this.order.userEmail = email;
    }
    this.createOrder(this.order).subscribe(data => console.log(data),
      error => alert(error));

  }

}
