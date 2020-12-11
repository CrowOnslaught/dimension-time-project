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

  async login(user:User) {
    try {
      await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
     return  await this.afAuth.currentUser;


  //if (userfirebase != null) {
    //console.log("------"+JSON.stringify(userfirebase))
    //console.log("------"+userfirebase.uid)

     /*userfirebase.providerData.forEach(function (profile) {
      localStorage.setItem("name",profile.displayName);
      console.log("Sign-in provider: " + profile.uid);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log(profile)*/
   // });


    } catch (error) {
      throw error;

    }

  }
  logout(){
    this.afAuth.signOut();
  }

  async register(user): Promise<any>{
    try {
      await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      const userfirebase= await this.afAuth.currentUser;

      return userfirebase.updateProfile({displayName: user.name});

    } catch (error) {
      throw error;

    }


  }

  isLogged$():Observable<any> {
    console.log("ISLOGGED!");
    return this.afAuth.authState.pipe(first());
  }
}
