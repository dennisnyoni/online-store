import { Component } from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartItemsQuantity: number=0;

  constructor(private cartService: ShoppingCartService, private authService: AuthService) {
  }

  ngOnInit(){
    this.cartItemsQuantity = this.cartService.getCartItems().length;
  }

  isCustomer(): boolean {
    return this.authService.getUserRole() === 'CUSTOMER';
  }

  isVendor(): boolean {
    return this.authService.getUserRole() === 'VENDOR';
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }
}
