import { User } from './../../../../shared/model/user';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() formGroup : FormGroup;
  @Output() register = new EventEmitter<User>();


  constructor() { }

  ngOnInit(): void {
  }


  registerFormSubmit(){
    this.register.emit(this.formGroup.value);
    //this.formGroup.reset();
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
