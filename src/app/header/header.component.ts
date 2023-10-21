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
  //noRole:boolean = true;
  role!: string
  constructor(private cartService: ShoppingCartService, private authService: AuthService) {
  }

  ngOnInit(){
    this.cartItemsQuantity = this.cartService.getCartItems().length;
    this.authService.setToken('eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImpkMkBlbWFpbC5jb20iLCJ1c2VySWQiOiJ1c2VyaWR8MiwwIiwicm9sZXMiOiJVc2VyIiwiZmlyc3ROYW1lIjoiam9obiIsImxhc3ROYW1lIjoiZG9lIiwic3ViIjoiamQyQGVtYWlsLmNvbSIsImlhdCI6MTY5NzQ3NzMwMiwiZXhwIjoxNjk3NTQyMTAyfQ.ikogfT-wTvi3uKuSSTt_MTJ4D2-RSRNIusfVSFuLoL8AQjbqzGMcrySZHFyAotLuyj3NOjYWi2r5iBFKEkCSYw');
    this.role = this.authService.decodeJwtToken(<string>this.authService.getToken()).roles;
    console.log('role: ',this.authService.decodeJwtToken(this.authService.getToken()).roles);
  }

  hasNoRole(){
    return this.authService.hasNoRole();
  }

  isCustomer(): boolean {

    return this.authService.isCustomer();

    // if(this.authService.getUserRole() === 'CUSTOMER'){
    //   this.noRole=false;
    //   return true;
    // }else
    //   return false;

  }

  isVendor(): boolean {

    return this.authService.isVendor();
    // if(this.authService.getUserRole() === 'VENDOR'){
    //   this.noRole=false;
    //   return true;
    // }else
    //   return false;


  }

  isAdmin(): boolean {

    return this.authService.isAdmin();
  }
  //   if(this.authService.getUserRole() === 'ADMIN'){
  //     this.noRole=false;
  //     return true;
  //   }else
  //     return false;
  // }
}
