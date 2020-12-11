import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FireAuthService } from '../../services/fire-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged:boolean;
  // subscription: Subscription;
  constructor(private fb : FireAuthService) { }

  ngOnInit(): void {
    /*this.subscription=*/ this.fb.isLogged$().subscribe(user => {
      console.log('header', user);
      if(user && user.uid) {this.isLogged=true} else{this.isLogged=false};
    console.log(this.isLogged)});
  }

  click()
  {
    this.fb.logout();
    console.log('isLogged:' +this.isLogged);
  }

  // ngOnDestroy():void{
  //   this.subscription.unsubscribe;
  // }

}
