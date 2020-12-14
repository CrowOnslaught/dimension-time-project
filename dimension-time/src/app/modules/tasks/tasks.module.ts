import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskIndividualComponent } from './components/task-individual/task-individual.component';
import { TaskGroupComponent } from './components/task-group/task-group.component';
import { TaskGroupPageComponent } from './pages/task-group-page/task-group-page.component';
import { TaskIndividualPageComponent } from './pages/task-individual-page/task-individual-page.component';
import { MaterialModule } from 'src/app/shared/material';

import { GetUserTaskByIdPipe } from 'src/app/shared/pipes/get-user-task-by-id.pipe';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GetUserTaskByIdPipe, TaskIndividualComponent, TaskGroupComponent, TaskGroupPageComponent, TaskIndividualPageComponent, TaskDialogComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[TaskGroupPageComponent,TaskGroupPageComponent]
})
export class TasksModule { }
