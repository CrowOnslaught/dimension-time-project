import { FireAuthService } from './../services/fire-auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authFireService: FireAuthService, private router: Router) { }

 async canActivate(){
    const user = await this.authFireService.isLogged$().toPromise();
      if (user && user.uid) {
        console.log("--------------")
        return true;
      }
      else {
        console.log("--------------")

        this.router.navigate(['/home']);
        return false;

      }

     return false;
  }


}
