import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { TasksModule } from 'src/app/modules/tasks';
import { Task } from '../model/task';
import { UserTask } from '../model/user-task';

@Injectable({
  providedIn: 'root'
})
export class FireTaskService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  readUserTasks$(): Observable<UserTask[]> {
    return this.afs.collection<UserTask>('user_task').valueChanges();
  }
  // async readUserTasks() : Promise<UserTask[]>
  // {
  //   let emailID;
  //   let l_userTask;

  //   await this.afAuth.currentUser.then(data =>
  //     {
  //       if (data != null) {
  //         data.providerData.forEach(function (profile) {
  //           emailID = profile.email;
  //         });
  //       }
  //       else
  //         return;

  //       this.afs.collectionGroup('user_task', ref => ref.where('userId', '==', emailID))
  //         .valueChanges().subscribe(data =>
  //           {
  //             l_userTask = data as UserTask[];
  //           });
  //           return l_userTask;
  //         });

  // }
  // readTasks() : Task[]
  // {
  //   let taskArray: Task[];

  //   let l_userTask = this.readUserTasks();

  //   for (let i = 0; i < l_userTask.length; i++)
  //   {
  //     const l_ut = l_userTask[i];
  //     const l_taskQuery = this.afs.collectionGroup('task', ref => ref.where('id', '==', l_ut.taskId))
  //       .valueChanges().subscribe(d =>
  //       {
  //         let l_task = d as Task[];
  //         taskArray.push(l_task[0]);
  //         l_taskQuery.unsubscribe();
  //       })
  //   }
  //   console.log(taskArray);
  //   return taskArray;
  // }
  readTasks() :any[]
  {
    let emailID;
    let userTaskArray: UserTask[] = [];
    let taskArray: Task[] = [];

    this.afAuth.currentUser.then(data =>
      {
        if(data != null)
        {
          data.providerData.forEach(function (profile) {
            emailID = profile.email;
          });
        }
        else
          return;

          this.afs.collectionGroup('user_task', ref => ref.where('userId', '==', emailID))
          .valueChanges().subscribe(data =>
            {
              let l_userTaskArray = data as UserTask[];

              for (let i =0; i< l_userTaskArray.length; i++)
              {
                const l_ut = l_userTaskArray[i];
                const l_taskQuery = this.afs.collectionGroup('task', ref => ref.where('id', '==', l_ut.taskId))
                .valueChanges().subscribe(d =>
                  {
                    let l_task = d as Task[];

                    taskArray.push(l_task[0]);
                    l_taskQuery.unsubscribe();
                  })

                  userTaskArray.push(l_ut);
                  console.log(userTaskArray)
              }
            })
        });
        return [userTaskArray, taskArray];
  }

  getTaskById$(id): Observable < Task > {
      return this.afs.collection<Task>('users').doc(id).valueChanges().pipe(first());
    }


  update(user: UserTask): Promise < void> {
      return this.afs.collection<UserTask>('users').doc(user.id).update(user);
    }
}
