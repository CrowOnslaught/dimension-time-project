import { Pipe, PipeTransform } from '@angular/core';
import { UserTask } from '../model/user-task';

@Pipe({
  name: 'getUserTaskById'
})
export class GetUserTaskByIdPipe implements PipeTransform {

  transform( v1 : any, v2 : any): number {

    return Number(v1.find(t => t.taskId == v2).duration);
  }

}
