import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class FireAuthService {


  constructor(private afAuth: AngularFireAuth) {}

  login(user:User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
}
  logout(){
    this.afAuth.signOut();
  }

  register(user): Promise<any>{
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  isLogged$():Observable<any> {
    return this.afAuth.authState.pipe(first());
  }
}
