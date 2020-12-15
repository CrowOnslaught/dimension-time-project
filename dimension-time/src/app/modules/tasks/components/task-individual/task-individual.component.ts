import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { Task } from 'src/app/shared/model/task';
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
  tasksByUser: any[] = [];
  tasks:Task[] = [];


   //snackBar
   horizontalPosition: MatSnackBarHorizontalPosition = 'right';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb : FormBuilder, private fTask: FireTaskService, private dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void
  {
    this.getTasksByUser();
  }
  add(){
    console.log("asdsadasdasdasd")
    this.getTask();

  }
  ngAfterContentInit(){
    this.getTask();
  }
  controlTask(){
    let tasks =[];
    for (let i = 0; i < this.tasks.length; i++) {
      let flag= false;

      for (let k = 0; k < this.tasksByUser.length; k++) {
        console.log("if: "+this.tasks[i].id + " "+this.tasksByUser[k].id)
        if(this.tasks[i].id == this.tasksByUser[k].id){
          flag=true;
        }
      }
      if(!flag){
        tasks.push(this.tasks[i]);
      }
    }
    return tasks;
  }
  getTask(){
    this.tasks =[];
    this.fTask.read$().subscribe(data=>{
      this.tasks =[];


      for (let i = 0; i < data.length; i++) {
        let flag= false;

        for (let k = 0; k < this.tasksByUser.length; k++) {
          console.log("if: "+data[i].id + " "+this.tasksByUser[k].id)
          if(data[i].id == this.tasksByUser[k].id){
            flag=true;
          }
        }
        if(!flag){
          this.tasks.push(data[i]);
        }
      }
      console.log("sad");
      console.log(this.tasks)
    });
  }
  getTasksByUser()
  {
    this.fTask.readTasks().then(data=>{
      console.log("logggg: "+data)
      this.tasksByUser = data;
      console.log("logggg1: "+data)
      console.log("logggg2: "+ this.tasksByUser)

      this.getTask();
    });

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
        if(timeStart !=""){
          timeEndControl.enable()
        }else{

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
    console.log("opendModal: "+JSON.stringify(data))
    this.getTask();
    for (let index = 0; index < this.tasksByUser.length; index++) {
      if(data.id != this.tasksByUser[index].id && this.tasksByUser[index].timeStart != ""){
        this.openSnackBar("Tienes una taska pendiente: " + this.tasksByUser[index].name,"info");
        return
      }
    }
    console.log("opendModal1: "+JSON.stringify(data))
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
    console.log("closeModal: "+JSON.stringify(data))

    if(data!=null || data!=undefined){
      if(data.timeStart !="" && data.timeEnd=="")
      {
        this.updateTime(data,"update");

      }else  if(data.timeStart !="" && data.timeEnd!=""){
        this.updateTime(data,"addTime");
      }
    }
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
    let objFind = this.tasksByUser.find(d=> d.userTaskId == data.userTaskId);
    let userTaskObj;

    switch(flag){
      case "addTime":
        let duration = this.tasksByUser.find(d=> d.userTaskId == data.userTaskId).duration;
        let dataTime = this.calculateTime(data);
        let result = this.calculateTimeIndividual(dataTime,duration)
        //let result = this.calcularString(dataTime,duration);
        result = this.transformString(result);
        data = Object.assign(data,{"duration":result});
        data.timeStart = "";
        data.timeEnd = "";
        userTaskObj = this.createUserTask(objFind,data);

        this.update(userTaskObj);

        break;
      case "update":

        userTaskObj = this.createUserTask(objFind,data);
        console.log("update: "+JSON.stringify(userTaskObj))

        this.update(userTaskObj);
        break;
    }
   // this.fTask.update(data)
  }

  update(data){
    console.log("update: "+JSON.stringify(data))


    this.fTask.update(data)
    .then(data=>{
      this.getTasksByUser();
    }
    ).catch(error=>console.log(""));

  }
  transformString(data){
    let dataTime = data.split(":");

    let resultHours = Number(dataTime[0]);
    let resultMinutes = Number(dataTime[1]);
    let  result;
    if(resultHours<10 && resultMinutes>=10){
      result = "0"+resultHours+":"+resultMinutes;

    }else if(resultHours>=10 && resultMinutes<10){
      result = resultHours+":0"+resultMinutes;

    }else if(resultHours<10 && resultMinutes<10){
      result = "0"+resultHours+":0"+resultMinutes;

    }else{
      result = resultHours+":"+resultMinutes;

    }
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

 //Modal 2 add task
 openModalAdd()
 {

   const dialogConfig = new MatDialogConfig();
  let tasks = this.controlTask();
   // this.formGroup.setValue(item);
   // dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;


   dialogConfig.data = this.createFormAdd(tasks);


   const dialogRef = this.dialog.open(AddTaskDialogComponent, dialogConfig);

   dialogRef.afterClosed().subscribe(
     data=> this.closeModalAdd(data))
   }

 closeModalAdd(data)
 {
   if(data!=null || data!=undefined){
     this.addTask(data);
   }
 }

 createFormAdd(tasks):FormGroup{

  let formgroup = this.fb.group({
    option:[""],
    task:[tasks]
  });


      return formgroup;

}

addTask(data){
  this.fTask.createUserTask(data).then(data=>{
    this.getTasksByUser();
  });
}


calculateTimeIndividual(data,task){
  let splitaStart = data.split(":");
  let splitEnd = task.split(":");

  let objMinuteStart = {hour: splitaStart[0],minute:splitaStart[1],second: 0};
  let objMinuteEnd = {hour: splitEnd[0],minute:splitEnd[1],second: 0};

console.log("data: "+splitaStart)
console.log("data: "+splitEnd[0])

  let timeCompare = this.calculateHours(objMinuteStart,objMinuteEnd);
  console.log("timeCompare: "+timeCompare)

  return timeCompare;
}
calculateHours(objMinuteStart,objMinuteEnd){
  let result;
  let resultTime;
  let date = new Date();

  let  objDateStart=new Date(2020+'-'+ 1 +"-"+1+" "+objMinuteStart.hour +":" + objMinuteStart.minute + ":" + objMinuteStart.second + ".000Z");
  let  objDateEnd=new Date(2020+'-'+ 1 +"-"+1+" "+objMinuteEnd.hour +":" + objMinuteEnd.minute + ":" + objMinuteEnd.second + ".000Z");
  objDateStart.setHours(objDateStart.getHours());
  objDateEnd.setHours(objDateEnd.getHours());

      //restar
      resultTime =objDateEnd.getTime()+ objDateStart.getTime();
      date.setTime(resultTime);
      console.log("date: "+date)



  date.setHours(date.getHours()-1);
  console.log("date.getHours()-1: "+date.getHours())

  result = date.getHours()+":"+date.getMinutes()
  console.log("result: "+result)
  return  result;
}


}


