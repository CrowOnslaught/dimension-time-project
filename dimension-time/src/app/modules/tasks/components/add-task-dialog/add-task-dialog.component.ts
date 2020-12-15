import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent  {

  tasks:any;
  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.formGroup = data;

    }

  ngOnInit(): void {
    this.tasks = this.formGroup.get("task").value
  }

  close(){
    this.dialogRef.close();
  }

  save(){


    this.dialogRef.close(this.formGroup.value);
  }
}
