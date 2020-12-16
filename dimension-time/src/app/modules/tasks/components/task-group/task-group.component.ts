import { Component, OnInit } from '@angular/core';
import { FireTaskService } from 'src/app/shared/services/fire-task.service';
import { isArray } from 'util';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss'],
})
export class TaskGroupComponent implements OnInit {
  allTasks: any[] = [];

  constructor(private fTask: FireTaskService) {}

  ngOnInit(): void {
    this.fTask.readTasksGroup().subscribe((data) => {
      this.fTask.readSubTask().subscribe((d) => {
        this.allTasks = [];
        let tasks = data;
        //let tasks = data.filter(dataT => d.find(dT=> dT.id==dataT.taskId).id == dataT.taskId);
        for (let i = 0; i < tasks.length; i++) {
          let t = tasks[i];

          let obj = d.find((dFind) => tasks[i].taskId == dFind.id);

          t = Object.assign(t, obj);
          let l_index = this.allTasks.findIndex(
            (alltaskFind) => alltaskFind.id == t.id
          );

          if (l_index == -1) this.allTasks.push(t);
          else {
            this.allTasks[l_index].duration = this.transformString(
              this.calculateTimeIndividual(this.allTasks[l_index].duration, t.duration)
            );
          }
        }
      });
    });
  }

  /*calculateTime(data, task) {
    console.log("")
    let splitaStart = data.split(':');
    let splitEnd = task.split(':');

    let objMinuteStart = {
      hour: splitaStart[0],
      minute: splitaStart[1],
      second: 0,
    };
    let objMinuteEnd = { hour: splitEnd[0], minute: splitEnd[1], second: 0 };

    let timeCompare = this.calculateTimeIndividual(objMinuteStart, objMinuteEnd);

    return timeCompare;
  }*/
  calculateTimeIndividual(data,task){
    let splitaStart = data.split(":");
    let splitEnd = task.split(":");

    let objMinuteStart = {hour: splitaStart[0],minute:splitaStart[1],second: 0};
    let objMinuteEnd = {hour: 0,minute:splitEnd[1],second: 0};



    let timeCompare = this.calculateHours(objMinuteStart,objMinuteEnd);

    let splitTimeCompare = timeCompare.split(":");
    let hours = Number(splitEnd[0])+Number(splitTimeCompare[0]);
    timeCompare = hours+":"+splitTimeCompare[1];

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



    date.setHours(date.getHours()-1);

    result = date.getHours()+":"+date.getMinutes()
    return  result;
  }
  compareHours(objMinuteStart, objMinuteEnd) {
    let result;
    let resultTime;
    let date = new Date();

    let objDateStart = new Date(
      2020 +'-' +1 +'-' +1 +' ' +objMinuteStart.hour +':' +objMinuteStart.minute +':' +objMinuteStart.second +'.000Z');
    let objDateEnd = new Date(2020 +'-' +1 +'-' +1 +' ' +objMinuteEnd.hour +':' +objMinuteEnd.minute +':' +objMinuteEnd.second +'.000Z');
    objDateStart.setHours(objDateStart.getHours());
    objDateEnd.setHours(objDateEnd.getHours());

    //restar
    resultTime = objDateEnd.getTime() + objDateStart.getTime();
    date.setTime(resultTime);

    date.setHours(date.getHours() - 1);

    result = date.getHours() + ':' + date.getMinutes();
    return result;
  }
  transformString(data) {
    let dataTime = data.split(':');

    let resultHours = Number(dataTime[0]);
    let resultMinutes = Number(dataTime[1]);
    let result;
    if (resultHours < 10 && resultMinutes >= 10) {
      result = '0' + resultHours + ':' + resultMinutes;
    } else if (resultHours >= 10 && resultMinutes < 10) {
      result = resultHours + ':0' + resultMinutes;
    } else if (resultHours < 10 && resultMinutes < 10) {
      result = '0' + resultHours + ':0' + resultMinutes;
    } else {
      result = resultHours + ':' + resultMinutes;
    }
    return result;
  }
}
