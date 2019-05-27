import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  role;
  constructor(private userService : UserService,private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      this.role=this.userService.getUserRole();
     // if () {
        //this.router.navigateByUrl('/userprofile');
       // return false;
     // }
    return true;
  }
}
