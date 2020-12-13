import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FireAuthService } from '../../services/fire-auth.service';
import { LogComunicationService } from '../../services/log-comunication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged:boolean;
  // subscription: Subscription;
  constructor(private fAuth : FireAuthService,
              private logCom : LogComunicationService) { }

  ngOnInit(): void {
    /*this.subscription=*/ this.logCom.isLogged$().subscribe(data =>
      {
      console.log('header', data);
      this.isLogged = data;
    });
  }

  click()
  {
    this.fAuth.logout();
    console.log('isLogged:' +this.isLogged);
  }
  logOut()
  {
    this.logCom.logIn(false);
  }

  // ngOnDestroy():void{
  //   this.subscription.unsubscribe;
  // }

}
