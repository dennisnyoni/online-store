import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data['expectedRoles']; // Roles expected for this route
    const token = this.authService.getToken();

    if (!token) {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }

    // Parse the JWT token to get user information, including roles
    const user = this.authService.decodeJwtToken(token);

    if (!user || !user.roles) {
      // Redirect to the login page if roles are missing
      this.router.navigate(['/login']);
      return false;
    }

    // Check if the user's role is in the expectedRoles
    if (expectedRoles.includes(user.roles)) {
      return true; // User has the required role, allow access
    }

    // User does not have the required role, redirect to a forbidden page
    this.router.navigate(['/forbidden']);
    return false;
  }
}
