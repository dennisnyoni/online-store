import { Component } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartItems: any[] = []; // An array to store items in the cart
  isCartItemsEmpty:boolean = true;


  constructor(private cartService: ShoppingCartService, private router: Router) { }

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

    return 0;//this.cartService.calculateTotal();
  }

  itemsInCart(): number{
    let totalNumItems: number=0;
    for(let item of this.cartItems){
      totalNumItems +=item.quantity;
    }
    return totalNumItems;
  }

  incrementQuantity(product: string) {
    this.cartService.incrementItemQuantity(product);
  }

  decrementQuantity(product: string) {
    this.cartService.decrementItemQuantity(product);
  }

  checkout(): void {
    // Implement the checkout logic, e.g., navigate to a checkout page
    this.router.navigate(['check-out']);
  }
}
