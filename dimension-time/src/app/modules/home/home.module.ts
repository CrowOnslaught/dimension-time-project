import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { HomePageComponent } from './pages/home-page.component';



@NgModule({
  declarations: [HomeComponent, HomePageComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
