import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(){
    /*const user = await this.authFireService.isLogged$().toPromise();
      if (user && user.uid) {
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;

      }
      */
     return false;
  }


}
