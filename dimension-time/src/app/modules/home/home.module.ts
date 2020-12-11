import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { HomePageComponent } from './pages/home-page.component';
import { MaterialModule } from 'src/app/shared/material';



@NgModule({
  declarations: [HomeComponent, HomePageComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class HomeModule { }
