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
    this.fTask.readTasksGroup().then(data=>{
      console.log("logggg: "+data)
      this.allTasks = data;
      console.log("logggg1: "+data)
      console.log("logggg2: "+ this.allTasks)
    });
  }



}
