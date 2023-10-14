import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
        () => {
          // Redirect to the home page or desired route after successful login
          // You can use the Router for navigation
        },
        error => {
          console.error('Login failed:', error);
        }
    );
  }
}
