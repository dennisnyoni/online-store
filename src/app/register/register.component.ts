import { Component } from '@angular/core';
import {Vendor} from "../Model/vendor";
import {Client} from "../Model/client";
import {User} from "../Model/user";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user!: User;
  display: any;
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(){
    this.user = new User();
    this.registerForm = new FormGroup<any>({
      'firstname':new FormControl(''),
      'lastname':new FormControl(''),
      'email': new FormControl(''),
      'phone': new FormControl(''),
      'password': new FormControl(''),
      'password2': new FormControl(''),
      'role': new FormControl(''),
      'street': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'zipcode': new FormControl(''),
    });
  }

  register(): void {
    this.user = this.registerForm.value;
    this.user.isActive = true;
    console.log(this.user);
    const userData = {

    };
console.log(userData);
    this.authService.register(this.user).subscribe(
        () => {
          // Redirect to the login page after successful registration
          // You can use the Router for navigation
          this.router.navigate(['/products'])
        },
        error => {
          console.error('Registration failed:', error);
        }
    );


  }

  registerCustomer(){

  }

  registerVendor(){

  }

  registerAdmin(){

  }
  onSubmit(data: any) {
    console.log('Submiting user data');
    this.register();
  }
}
