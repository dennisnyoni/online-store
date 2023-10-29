import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private errorService: ErrorService, private router: Router) {}

  ngOnInit(){

  }

  login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
        () => {
           // Redirect to the home page or desired route after successful login
          this.router.navigate(['products'])
        },
      (error: HttpErrorResponse) => {
          alert(this.errorService.getErrorMessage(error.status));

        }
    );
  }
}
