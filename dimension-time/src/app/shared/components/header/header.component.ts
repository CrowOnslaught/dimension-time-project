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
    this.logCom.isLogged$().subscribe(data =>
    {
      this.isLogged = data;
    });
  }

  click()
  {
    this.fAuth.logout(true);
  }
  logOut()
  {
    this.logCom.logIn(false);
    this.fAuth.logout(true);
  }

  // ngOnDestroy():void{
  //   this.subscription.unsubscribe;
  // }

}
