import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {
   isAuthenticated! :boolean; 
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
 this.authService.isAuthenticated().subscribe({
  next:(data)=>{
this.isAuthenticated=data
  }
 });

    if (!this.isAuthenticated) {
      console.log("User is not authenticated, redirecting to login.");
       this.router.navigateByUrl("/login");
      return false;
    } else {
      console.log("User is authenticated.");
      return true;
    }
  }
}