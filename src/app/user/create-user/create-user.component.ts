import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../Model/product";
import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {User} from "../../Model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

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
        this.router.navigate(['/user-list'])
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
