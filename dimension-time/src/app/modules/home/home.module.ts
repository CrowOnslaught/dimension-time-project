import { UsersModule } from './../users/users.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { HomePageComponent } from './pages/home-page.component';
import { HeroModule } from 'src/app/shared/components/hero';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HomeComponent, HomePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeroModule,
    UsersModule
  ],
  exports:[HomePageComponent]

})
export class HomeModule { }
