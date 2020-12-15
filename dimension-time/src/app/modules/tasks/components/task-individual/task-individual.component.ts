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

    //data.timeStart = "19:25"
    let formgroup = this.fb.group({
      userTaskId:[data.userTaskId],
      name:[{value:data.name, disabled:true}],
      description:[{value:data.description, disabled:true}],
      timeStart:[data.timeStart],
      timeEnd:[data.timeEnd]
    });


    const timeStartControl = formgroup.get('timeStart');
    const timeEndControl = formgroup.get('timeEnd');

    if(timeStartControl.value !== ''){
      timeStartControl.disable()

    }else if(timeStartControl.value===""){
      timeEndControl.disable()
    }



      formgroup.get('timeStart').valueChanges
        .subscribe(timeStart => {
          console.log("sadasd")
        if(timeStart !=""){
          console.log("aaaaa")
          timeEndControl.enable()
        }else{
          console.log("bbbbbbb")

          timeEndControl.disable()
          timeEndControl.setValue("");
        }
        });

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

    const dialogConfig = new MatDialogConfig();

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
    if(data!=null || data!=undefined){
      if(data.timeStart !="" && data.timeEnd=="")
      {
        this.updateTime(data,"update");

      }else  if(data.timeStart !="" && data.timeEnd!=""){
        this.updateTime(data,"addTime");
      }
    }
    console.log(data);
  }
  createUserTask(data,dataModify){
    if(dataModify.duration == undefined){
      dataModify.duration = data.duration
    }
    let userTask ={
      userTaskId:data.userTaskId,
      duration:dataModify.duration,
      taskId:data.taskId,
      timeEnd:dataModify.timeEnd,
      timeStart:dataModify.timeStart,
      userId:data.userId
    }
    return userTask
  }
  updateTime(data,flag){
    let objFind = this.tasks.find(data=> data.userTaskId == data.userTaskId);
    let userTaskObj;

    switch(flag){
      case "addTime":
        console.log("addtime: "+JSON.stringify(data))
        console.log(JSON.stringify(this.tasks.find(d=> d.userTaskId == data.userTaskId)))
        let duration = this.tasks.find(d=> d.userTaskId == data.userTaskId).duration;
        let dataTime = this.calculateTime(data);
        let result = this.calcularString(dataTime,duration);
        data = Object.assign(data,{"duration":result});
        data.timeStart = "";
        data.timeEnd = "";
        console.log("dataTime: "+ data.duration +"  "+data)
        userTaskObj = this.createUserTask(objFind,data);

        this.update(userTaskObj);

        break;
      case "update":
         console.log(data);
        userTaskObj = this.createUserTask(objFind,data);
        this.update(userTaskObj);
        break;
    }
   // this.fTask.update(data)
  }

  update(data){

    this.fTask.update(data)
    .then(data=>{
      this.getTasks();
    }
    ).catch(error=>console.log(error));

  }
  calcularString(data,duration){
    console.log(JSON.stringify(data));
    let dataTime = data.split(":");
    let durationTime = duration.split(":");

    let resultHours = Number(durationTime[0])+Number(dataTime[0]);
    console.log("resultHours:"+resultHours)
    let resultMinutes = Number(durationTime[1])+Number(dataTime[1]);
    let  result = resultHours+":"+resultMinutes;
    console.log("string: "+ result)
    return result;
  }

  calculateTime(data){
    let splitaStart = data.timeStart.split(":");
    let splitEnd = data.timeEnd.split(":");

    let objMinuteStart = {hour: splitaStart[0],minute:splitaStart[1],second: 0};
    let objMinuteEnd = {hour: splitEnd[0],minute:splitEnd[1],second: 0};


    let timeCompare = this.compareHours(objMinuteStart,objMinuteEnd);


    return timeCompare;
  }
  compareHours(objMinuteStart,objMinuteEnd){
    let result;
    let resultTime;
    let date = new Date();

    let  objDateStart=new Date(2020+'-'+ 1 +"-"+1+" "+objMinuteStart.hour +":" + objMinuteStart.minute + ":" + objMinuteStart.second + ".000Z");
    let  objDateEnd=new Date(2020+'-'+ 1 +"-"+1+" "+objMinuteEnd.hour +":" + objMinuteEnd.minute + ":" + objMinuteEnd.second + ".000Z");
    objDateStart.setHours(objDateStart.getHours()-1);
    objDateEnd.setHours(objDateEnd.getHours()-1);

    if((objDateStart.getTime() / 1000) < (objDateEnd.getTime() / 1000)){
        //restar
        console.log(objDateStart.getHours());
        console.log(objDateEnd.getHours());
        resultTime =objDateEnd.getTime()- objDateStart.getTime();
        date.setTime(resultTime);


    }else{
      //sumar 24 al end y restar normal
      let hours = objDateEnd.getHours() + 24
      objDateEnd.setHours(hours);
      resultTime= objDateEnd.getTime()- objDateStart.getTime();
      date.setTime(resultTime);
    }
    date.setHours(date.getHours()-1);
    result = date.getHours()+":"+date.getMinutes()
    return  result;
 }

}


