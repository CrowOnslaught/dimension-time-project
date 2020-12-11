import { TaskGroupPageComponent } from './pages/task-group-page/task-group-page.component';
import { TaskIndividualPageComponent } from './pages/task-individual-page/task-individual-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"individual", component: TaskIndividualPageComponent},
  {path:"group", component: TaskGroupPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
