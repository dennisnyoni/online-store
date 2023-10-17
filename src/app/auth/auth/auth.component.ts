import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    //console.log('token :',this.authService.decodeJwtToken('eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImpkMkBlbWFpbC5jb20iLCJ1c2VySWQiOiJ1c2VyaWR8MiwwIiwicm9sZXMiOiJVc2VyIiwiZmlyc3ROYW1lIjoiam9obiIsImxhc3ROYW1lIjoiZG9lIiwic3ViIjoiamQyQGVtYWlsLmNvbSIsImlhdCI6MTY5NzQ3NzMwMiwiZXhwIjoxNjk3NTQyMTAyfQ.ikogfT-wTvi3uKuSSTt_MTJ4D2-RSRNIusfVSFuLoL8AQjbqzGMcrySZHFyAotLuyj3NOjYWi2r5iBFKEkCSYw'));

  }

  login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
        () => {
           // Redirect to the home page or desired route after successful login
          this.router.navigate(['products'])
        },
        error => {

          console.error('Login failed:', error);
        }
    );
  }
}
