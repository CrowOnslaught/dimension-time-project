import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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


   //snackBar
   horizontalPosition: MatSnackBarHorizontalPosition = 'right';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb : FormBuilder, private fTask: FireTaskService, private dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void
  {
    this.getTasks();
  }

  getTasks()
  {
    this.tasks = this.fTask.readTasks();
  }

  createForm(data):FormGroup{

    data.timeStart = "19:25"
    let formgroup = this.fb.group({
      userTaskId:[data.taskId],
      name:[{value:data.name, disabled:true}],
      description:[{value:data.description, disabled:true}],
      timeStart:[data.timeStart],
      timeEnd:[data.timeEnd]
    });


    const timeStartControl = formgroup.get('timeStart');

    console.log(timeStartControl.value)
    if(timeStartControl.value !== ''){
      console.log("gola")
      timeStartControl.disable()

    }
    return formgroup;

  }

  openSnackBar(message: string, className: string){
    this._snackBar.open(message, '', {
      duration: 1500,
      panelClass: [className],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  openModal(data)
  {

    for (let index = 0; index < this.tasks.length; index++) {
      if(data.id != this.tasks[index].id && this.tasks[index].timeStart != ""){
        this.openSnackBar("Tienes una taska pendiente: " + this.tasks[index].name,"info");
        return
      }
    }

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
