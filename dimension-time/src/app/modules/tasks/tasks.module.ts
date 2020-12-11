import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskIndividualComponent } from './components/task-individual/task-individual.component';
import { TaskGroupComponent } from './components/task-group/task-group.component';
import { TaskGroupPageComponent } from './pages/task-group-page/task-group-page.component';
import { TaskIndividualPageComponent } from './pages/task-individual-page/task-individual-page.component';


@NgModule({
  declarations: [TaskIndividualComponent, TaskGroupComponent, TaskGroupPageComponent, TaskIndividualPageComponent],
  imports: [
    CommonModule,
    TasksRoutingModule
  ],exports:[TaskGroupPageComponent,TaskGroupPageComponent]
})
export class TasksModule { }
