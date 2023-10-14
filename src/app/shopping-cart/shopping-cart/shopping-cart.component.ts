import { Component } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartItems: any[] = []; // An array to store items in the cart
  isCartItemsEmpty:boolean = true;


  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    // Fetch cart items from the services when the component initializes
    this.cartItems = this.cartService.getCartItems();
    if(this.cartItems.length>0)
      this.isCartItemsEmpty=false;
  }

  removeFromCart(item: any): void {
    // Remove the selected item from the cart
    this.cartService.removeFromCart(item);
    // Update the cart items displayed in the UI
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotal(): number {
    // Calculate the total cost of items in the cart
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  }

  checkout(): void {
    // Implement the checkout logic, e.g., navigate to a checkout page
    // This can involve calling a backend API for payment processing
  }
}
