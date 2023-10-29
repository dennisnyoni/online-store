import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../Model/product";
import {ShoppingCart} from "../Model/shopping-cart";
import {environment} from "../../../environment";
import {CookieService} from "ngx-cookie-service";
import {ProductService} from "./product.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  randomValue!:number;
  private cart: Map<number, number> = new Map();
  numOfItems: number = 0;
  cartItems: any[] = [];
  shoppingCartBaseUrl:string = environment.shoppingCartBaseUrl;
  private productCatalog: Map<number, number> = new Map();
  products: Product[] = [];

  constructor(private http: HttpClient, private cookieService: CookieService,private productService: ProductService,private snackBar: MatSnackBar) {
    this.randomValue = this.getRandomNumber(10000, 100000000); // Generates a random number between 10000 (inclusive) and 100000000 (exclusive)
    const cartData = this.cookieService.get(this.randomValue.toString());
    if (cartData) {
      this.cart = new Map(JSON.parse(cartData));
    }

    this.productService.getProductList().subscribe((data) => {
      this.products = data;
    });

    for( let item of this.products){
     this.productCatalog.set(item.productId, item.productPrice);
    }

  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (2 seconds)
    });
  }

  // Generate a random number between min (inclusive) and max (exclusive)
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getCart(): Map<number, number> {
    return this.cart;
  }

  addItem(productId: number, quantity: number): void {
    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
    this.updateCartCookie();
    console.log('cart :',this.cart);
  }

  removeItem(productId: number): void {
    this.cart.delete(productId);
    this.updateCartCookie();
  }

  updateItemQuantity(productId: number, quantity: number): void {
    this.cart.set(productId, quantity);
    this.updateCartCookie();
  }

  private updateCartCookie(): void {
    this.cookieService.set(this.randomValue.toString(), JSON.stringify(Array.from(this.cart.entries())));
  }



  sendCookieToBackend() {
    const cookieValue = this.cookieService.get(this.randomValue.toString());

    if (cookieValue) {
      const headers = new HttpHeaders().set('shopping-cart-cookie', `cookie=${cookieValue}`);

      this.http
        .post('http://10.200.31.152:8889/order-service/cart', null, { headers })
        .subscribe(response => {
          console.log('Backend Response:', response);
        });
    } else {
      console.log('Cookie not found.');
    }
  }


  getTotalItemsInCart(): number {
    let total = 0;
    for (const quantity of this.cart.values()) {
      total += quantity;
    }
    return total;
  }


calculateTotal(): number {
  let totalCost = 0;

  for (const [productId, quantity] of this.cart.entries()) {
    const price = this.productCatalog.get(productId) || 0; // Get the price from the catalog
    totalCost += price * quantity; // Calculate the total cost for this item
  }

  return totalCost;
}



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
    this.numOfItems++;
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

  getTotalItems(): number {
    // let quantity:number=0;
    // for (const item of this.cartItems) {
    //   quantity += item.quantity;
    // }
    // return quantity;
    return this.numOfItems;
  }
  // Clear the entire cart
  clearCart(): void {
    this.cartItems = [];
  }

  incrementItemQuantity(product: any) {
    const item = this.cartItems.find((item) => item.productId === product.productId);
    console.log('item.productName === product :',item.productName === product)
    if (item) {
      item.quantity += 1;
      this.numOfItems++;
    }
  }

  decrementItemQuantity(product: any) {
    const item = this.cartItems.find((item) => item.productId === product.productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.numOfItems--;
    }
  }


}
