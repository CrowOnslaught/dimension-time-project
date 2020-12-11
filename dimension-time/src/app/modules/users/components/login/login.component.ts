import { User } from './../../../../shared/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @Input() formGroup : FormGroup;
  @Output() login = new EventEmitter<User>();
  constructor() { }

  ngOnInit(): void {

  }

  loginFormSubmit(){
    this.login.emit(this.formGroup.value);
    this.formGroup.reset();
  }

  public getError(controlName: string): string[] {
    let error =  [];
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null) {
     // error = JSON.stringify(control.errors);
      error = [...Object.keys(control.errors)];
    }
    return error;
  }

}
