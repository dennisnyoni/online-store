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
  noRole:boolean = true;

  constructor(private cartService: ShoppingCartService, private authService: AuthService) {
  }

  ngOnInit(){
    this.cartItemsQuantity = this.cartService.getCartItems().length;
  }

  isCustomer(): boolean {

    if(this.authService.getUserRole() === 'ROLE_CUSTOMER'){
      this.noRole=false;
      return true;
    }else
      return false;

    //this.noRole=false;
    //return this.authService.getUserRole() === 'ROLE_CUSTOMER';
  }

  isVendor(): boolean {

    if(this.authService.getUserRole() === 'ROLE_VENDOR'){
      this.noRole=false;
      return true;
    }else
      return false;

    //this.noRole=false;
    //return this.authService.getUserRole() === 'ROLE_VENDOR';
  }

  isAdmin(): boolean {
    if(this.authService.getUserRole() === 'ROLE_ADMIN'){
      this.noRole=false;
      return true;
    }else
      return false;
  }
}
