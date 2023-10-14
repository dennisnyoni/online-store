import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../Model/product";
import {ShoppingCart} from "../Model/shopping-cart";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItems: any[] = [];
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

  // Add an item to the cart
  addToCart(item: any): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      // If the item is already in the cart, increase its quantity
      existingItem.quantity++;
    } else {
      // If it's a new item, add it to the cart with a quantity of 1
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  // Remove an item from the cart
  removeFromCart(item: any): void {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex !== -1) {
      // Remove the item from the cart
      this.cartItems.splice(itemIndex, 1);
    }
  }

  // Get all items in the cart
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Clear the entire cart
  clearCart(): void {
    this.cartItems = [];
  }

}
