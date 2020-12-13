import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogComunicationService {

  isLogged = new BehaviorSubject<boolean>(false);
  constructor() { }


  isLogged$() : BehaviorSubject<boolean>
  {
    return this.isLogged;
  }
  logIn(b:boolean)
  {
    this.isLogged.next(b)
  }
}
