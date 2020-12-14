import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserTask } from 'src/app/shared/model/user-task';
import { FireTaskService } from 'src/app/shared/services/fire-task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-individual',
  templateUrl: './task-individual.component.html',
  styleUrls: ['./task-individual.component.scss']
})
export class TaskIndividualComponent implements OnInit {

  userTasks: UserTask[] = [];
  tasks: any[] = [];

  constructor(private fb : FormBuilder, private fTask: FireTaskService, private dialog: MatDialog) { }

  ngOnInit(): void
  {
    this.getTasks();
  }

  getTasks()
  {
    this.tasks = this.fTask.readTasks();
  }

  createForm(data):FormGroup{
    return  this.fb.group({
      userTaskId:[data.taskId,Validators.required],
      name:[{value:data.name, disabled:true},Validators.required],
      description:[{value:data.description, disabled:true},Validators.required],
      timeStart:[data.timeStart,Validators.required],
      timeEnd:[data.timeEnd,Validators.required]
    });
  }


  openModal(data)
  {
    const dialogConfig =new MatDialogConfig();

    // this.formGroup.setValue(item);
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.createForm(data);


    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data=> this.closeModal(data))
    }

  closeModal(data)
  {
    console.log(data);
  }

}
