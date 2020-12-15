import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';
import { UserTask } from '../model/user-task';

@Pipe({
  name: 'getUserTaskByName',
  pure: false
})
export class GetUserTaskByNamePipe implements PipeTransform {

  transform( v1 : any[], v2 : string): any[] {


    v1 = v1.filter(t =>{
        let nameValid = false;

        if (v2 && v2 != "") {
        if (t.name.toLowerCase().indexOf(v2.toLowerCase()) != -1) {
          nameValid = true;
        }

      } else {
        nameValid = true;
      }
      return nameValid;
    });

    return v1;
}
}
