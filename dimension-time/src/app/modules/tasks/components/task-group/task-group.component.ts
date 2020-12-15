import { Component, OnInit } from '@angular/core';
import { FireTaskService } from 'src/app/shared/services/fire-task.service';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit {

  allTasks: any[] = [];


  constructor(private fTask : FireTaskService) { }

  ngOnInit(): void
  {
    console.log("aaaaaaa");
    this.fTask.readTasksGroup().subscribe(data=>{
      this.fTask.readSubTask().subscribe(d=>{
        this.allTasks=[]
        console.log(d)
        let tasks = data.filter(dataT => d.find(dT=> dT.id==dataT.taskId).id == dataT.taskId);
console.log(tasks)
        for (let i=0; i< tasks.length; i++)
        {
          console.log("aaaaaa");
          let t = data[i];
          let task= d.find(taskFilter=> tasks.find(tasksFind=>tasksFind.id == taskFilter.taskId));
          t= Object.assign(t,task);
          console.log("t:"+ JSON.stringify(t))
          let l_index= this.allTasks.findIndex(alltaskFind=>alltaskFind.id == t.id);
          if( l_index == -1)
            this.allTasks.push(t);
          else
          {
            this.allTasks[l_index].duration = this.transformString(this.calculateTime(this.allTasks[l_index].duration,t.duration));
          }
        }

      })
    });
  }

  calculateTime(data,task){
    let splitaStart = data.split(":");
    let splitEnd = task.split(":");

    let objMinuteStart = {hour: splitaStart[0],minute:splitaStart[1],second: 0};
    let objMinuteEnd = {hour: splitEnd[0],minute:splitEnd[1],second: 0};

console.log("data: "+splitaStart)
console.log("data: "+splitEnd[0])

    let timeCompare = this.compareHours(objMinuteStart,objMinuteEnd);
    console.log("timeCompare: "+timeCompare)

    return timeCompare;
  }
  compareHours(objMinuteStart,objMinuteEnd){
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






}
