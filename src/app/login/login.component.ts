import {Component, Input} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {User} from "../Model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  role!: string;
  username: string = '';
  password: string = '';
  loginForm!: FormGroup;
  token!: string;

  constructor(private authService: AuthService, private loginService: LoginService) {}

  ngOnInit(){

    this.loginForm = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl('')
    });
  }

  login(data:any): void {
    console.log('username ',this.loginForm.get('username')?.value);
    let formData = new FormData();

    this.authService.login({ username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value }).subscribe(
        () => {
          // Redirect to the home page or desired route after successful login
          // You can use the Router for navigation

          this.role = this.authService.decodeJwtToken(<string>this.authService.getToken()).role;
          console.log('username ',this.loginForm.get('username')?.value);
          console.log(this.authService.getToken());

        },
        error => {
          console.error('Login failed:', error);
        }
    );
  }
}
