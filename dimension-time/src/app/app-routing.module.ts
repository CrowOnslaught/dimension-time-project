import { AuthGuard } from './shared/guards/auth.guard';
import { HomePageComponent } from './modules/home/pages/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'home', component: HomePageComponent },
  {path:'', redirectTo:'home', pathMatch:'full' },
  {path:'users',  loadChildren: () => import('./modules/users').then(m => m.UsersModule),canActivate: [AuthGuard]},
  {path:'tasks',  loadChildren: () => import('./modules/tasks').then(m => m.TasksModule),canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:'reload',
    scrollPositionRestoration: 'enabled', // or 'top'
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64] // [x, y] - adjust scroll offset
            })
          ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
