import { Component } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-customer-dash-board',
  templateUrl: './customer-dash-board.component.html',
  styleUrls: ['./customer-dash-board.component.css']
})
export class CustomerDashBoardComponent {
  firstName: any;

  totalQuantity: number = 0;

  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService) {
    this.calculateTotalQuantity();
  }

  private calculateTotalQuantity(): void {
    const cartItems = this.shoppingCartService.getCartItems();
    this.totalQuantity = Array.from(cartItems.values()).reduce((total, quantity) => total + quantity, 0);
  }

    logout() {
    this.authService.logout();

    }
}
