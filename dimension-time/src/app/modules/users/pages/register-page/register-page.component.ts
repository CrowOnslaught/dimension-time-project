import { FireAuthService } from './../../../../shared/services/fire-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { rejects } from 'assert';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,private route: Router,private fireAuthService: FireAuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  register(user){
    //console.log(user);
    let response = this.fireAuthService.register(user);
    response.then(data=>{console.log(data)}).catch((error) => {

    })
    //this.route.navigate(['/home']);
  }

  private buildForm() {
    const minPassLength = 4;
    this.formGroup = this.fb.group({
      name: ['', [
        Validators.required]],
      email: ['', [
        Validators.required, Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(minPassLength),
      ]],
      confirm_password: ['', [Validators.required]]
    }, { validator: this.mustMatch('password', `confirm_password`) }
    );
  }
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
