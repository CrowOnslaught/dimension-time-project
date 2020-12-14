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

  userTasks: UserTask[] = [];
  tasks: Task[] = [];

  constructor(private fTask: FireTaskService) { }

  ngOnInit(): void
  {
    this.getTasks();
  }

  getTasks()
  {
    let l_result = this.fTask.readTasks();

    this.userTasks = l_result[0];
    this.tasks = l_result[1];

  }

  getTasksInfo()
  {
  }

}
