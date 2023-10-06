import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../Model/product";
import {ShoppingCart} from "../Model/shopping-cart";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartBaseUrl:string = '';
  constructor(private http: HttpClient) { }

  getShoppingCart(id: number): Observable<any>{
    return this.http.get(`${this.shoppingCartBaseUrl}/${id}`);
  }

  createShoppingCart(shoppingCart: ShoppingCart): Observable<any>{
    return this.http.post(`${this.shoppingCartBaseUrl}`, shoppingCart);
  }

  updateShoppingCart(id: number, value: any): Observable<any>{
    return this.http.put(`${this.shoppingCartBaseUrl}/${id}`,value);
  }

  deleteShoppingCart(id: number): Observable<any>{
    return this.http.delete(`${this.shoppingCartBaseUrl}/${id}`,{responseType: 'text'});
  }

  getShoppingCartList(): Observable<any>{
    return this.http.get(`${this.shoppingCartBaseUrl}`);
  }
}
