import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/model/task';
import { UserTask } from 'src/app/shared/model/user-task';
import { FireTaskService } from 'src/app/shared/services/fire-task.service';

@Component({
  selector: 'app-task-individual',
  templateUrl: './task-individual.component.html',
  styleUrls: ['./task-individual.component.scss']
})
export class TaskIndividualComponent implements OnInit {

  userTasks: UserTask[] = []
  tasks: Task[] = []

  constructor(private fTask: FireTaskService) { }

  ngOnInit(): void
  {
    console.log("AQUI");
    this.tasks = this.fTask.readTasks$();
    console.log("tasks" + this.tasks);
  }

  getTasks()
  {
    //llenar userTaks from fb
  }

  getTasksInfo()
  {
    for(let t of this.userTasks)
    {
      let l_taskID = t.taskId;
      //Leer task con esa ID de fb
      //añadir a tasks
    }
  }

}
