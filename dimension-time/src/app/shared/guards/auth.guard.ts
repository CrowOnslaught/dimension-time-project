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

    let url =this.router.getCurrentNavigation().extractedUrl;

      if (user && user.uid) {

        if (url.toString().indexOf("users")!=-1) {
          this.router.navigate(['/home']);

          return false;

        }else if(url.toString().indexOf("tasks")!=-1){
          return true;

        }else{
          return true;

        }

      }
      else {
        if (url.toString().indexOf("users")!=-1) {
          return true;
        }
        this.router.navigate(['/home']);
        return false;

      }

     return false;
  }
 /* Logout() {
    // (logout logic here)
      var currentRouteConfig = this.router.config.find(f=>f.path == this.router.url.substr(1));
      if(currentRouteConfig != null && currentRouteConfig.CanActivate != null)  {
        this.redirectUrl = this.router.url;
        this.router.navigate(['/login'])
    }
*/

}
