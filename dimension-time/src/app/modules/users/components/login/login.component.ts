import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @Input() formGroup: FormGroup;
  @Output() login = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log('formulari', this.formGroup.value)
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
