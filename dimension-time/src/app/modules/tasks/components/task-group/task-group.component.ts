import { Component, OnInit } from '@angular/core';
import { FireTaskService } from 'src/app/shared/services/fire-task.service';
import { isArray } from 'util';

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
    let l_tasks = [];
    this.fTask.readTasksGroup().then(data=>{
      l_tasks = data;
      console.log(l_tasks);
    }).then
    (data =>{
      console.log(l_tasks);
      console.log(l_tasks.length);
      for (let i=0; i< l_tasks.length; i++)
      {
        console.log("aaaaaa");
        let t = l_tasks[i];
        let l_index= this.allTasks.indexOf(t);
        console.log("index: " + l_index);
        if( l_index == -1)
          this.allTasks.push(t);
        else
        {
          this.allTasks[l_index].duration += t.duration;
        }
      }
    });
  }



}
