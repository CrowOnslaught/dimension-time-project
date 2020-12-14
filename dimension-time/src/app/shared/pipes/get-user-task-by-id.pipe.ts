import { Pipe, PipeTransform } from '@angular/core';
import { UserTask } from '../model/user-task';

@Pipe({
  name: 'getUserTaskById'
})
export class GetUserTaskByIdPipe implements PipeTransform {

  transform( v1 : any, v2 : any): number {

    console.log("v1: " + v1 +"|TypeOf:" + typeof(v1));
    return Number(v1.find(t => t.taskId == v2).duration);
  }

}
