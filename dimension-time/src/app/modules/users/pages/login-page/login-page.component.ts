import { FireAuthService } from './../../../../shared/services/fire-auth.service';
import { User } from './../../../../shared/model/user';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LogComunicationService } from 'src/app/shared/services/log-comunication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formGroup : FormGroup;

  //snackBar
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private fb: FormBuilder,private route: Router,private fireAuthService:FireAuthService,private _snackBar: MatSnackBar, private logCom : LogComunicationService) { }

  ngOnInit(): void {
    this.buildForm();

  }

  openSnackBar(message: string, className: string){
    this._snackBar.open(message, '', {
      duration: 1000,
      panelClass: [className],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  login(user:User){
    console.log(user);
    let response = this.fireAuthService.login(user);
    response.then(data=>{
      this.logCom.logIn(true);
      data.providerData.forEach(function (profile) {
        console.log(profile.displayName);
        localStorage.setItem("name",profile.displayName);
        localStorage.setItem("email",profile.email);
      });
      this.openSnackBar("Loggin Successful","successful");
      this.route.navigate(['/home'])
    }).catch((error)=>{
      this.openSnackBar("Register Error","error");
      console.log(error);
    });
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
