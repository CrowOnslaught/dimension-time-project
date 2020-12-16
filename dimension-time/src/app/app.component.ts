import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from './shared/services/fire-auth.service';
import { LogComunicationService } from './shared/services/log-comunication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dimension-time';

  constructor(private router: Router, private fAuth : FireAuthService, private logCom : LogComunicationService){}

  ngOnInit()
  {
    this.fAuth.isLogged$().subscribe(data =>
      {
        if(data != null)
          this.logCom.logIn(true);
      })
  }

}
