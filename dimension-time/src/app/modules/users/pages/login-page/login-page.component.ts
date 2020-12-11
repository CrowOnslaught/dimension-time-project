import { FireAuthService } from './../../../../shared/services/fire-auth.service';
import { User } from './../../../../shared/model/user';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formGroup : FormGroup;

  constructor(private fb: FormBuilder,private route: Router,private fireAuthService:FireAuthService) { }

  ngOnInit(): void {
    this.buildForm();

  }

  login(user:User){
    console.log(user);
    let response = this.fireAuthService.login(user);
    response.then(data=>{
      console.log("sadsadsad");
      console.log(data);
    }).catch((error)=>{
      console.log(error);
    });
    //this.route.navigate(['/home']);
  }

  private buildForm(){
    const minPassLength = 4;
    this.formGroup = this.fb.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(minPassLength),
      ]]
    });
  }
}
