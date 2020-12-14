import { Component, Inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {

  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.formGroup = data;

    }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    const timeStartControl = this.formGroup.get('timeStart');
    timeStartControl.enable();

    this.dialogRef.close(this.formGroup.value);
  }

}
