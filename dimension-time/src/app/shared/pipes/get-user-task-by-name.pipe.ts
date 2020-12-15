import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';
import { UserTask } from '../model/user-task';

@Pipe({
  name: 'getUserTaskByName',
  pure: false
})
export class GetUserTaskByNamePipe implements PipeTransform {

  transform( v1 : any[], v2 : string): any[] {

    if (v2 == '')
      return v1;
    else
      return v1.filter(t => t.name.indexOf(v2) != -1);
  }
}
