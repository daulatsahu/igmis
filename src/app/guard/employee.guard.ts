import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor( private router:Router, private AS:AuthService){}
  canActivate()  {
    const user = this.AS.currentUser;
    console.log('role',user);
    if (user && ( user.role === 3)) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
   }
   
  }
  
}
