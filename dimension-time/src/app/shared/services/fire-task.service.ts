import { UserTask } from 'src/app/shared/model/user-task';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { catchError, first, switchMap } from 'rxjs/operators';
import { TasksModule } from 'src/app/modules/tasks';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class FireTaskService {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

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

  async readTasksGroup():Promise<any[]>
  {
    let emailID;
    let userTaskArray: UserTask[] = [];
    let taskArray: Task[] = [];
    console.log("enmo1");
    try
    {
      console.log("enmo2");

      let l_user = await this.afAuth.currentUser;
      if(l_user != null)
      {
        console.log("enmo3");

        const l_user_taskQuery:UserTask[] = await this.afs.collectionGroup<UserTask>('user_task', (ref) =>
          ref.where('duration', '!=', "00:00")).valueChanges().toPromise();

          console.log("enmo4");

        const l_taskQuery:Task[] = await this.afs.collection<Task>('task').valueChanges().toPromise();

        console.log("enmo5");

        let tasks = l_user_taskQuery.filter(data => l_taskQuery.find(d=> d.id==data.taskId).id == data.taskId);
        console.log("filter:"+ tasks);
        console.log("enmo6");

      }
    }
    catch(e)
    {
      console.log("enmoError");

      console.log(e);
    }
    await this.afAuth.currentUser.then((data) => {
      if (data != null) {
        data.providerData.forEach(function (profile) {
          emailID = profile.email;
        });
      } else return;

      const l_user_taskTaskQuery = this.afs
      .collectionGroup('user_task', (ref) =>
        ref.where('duration', '!=', "00:00")
      ).valueChanges()
      .subscribe((data) => {
        console.log('important: ' + JSON.stringify(data));
        let l_userTaskArray = data as UserTask[];

        for (let i = 0; i < l_userTaskArray.length; i++) {
          const l_ut = l_userTaskArray[i];
          const l_taskQuery = this.afs
            .collectionGroup('task', (ref) =>
              ref.where('id', '==', l_ut.taskId)
            )
            .valueChanges()
            .subscribe((d) => {
              let l_tasks = d as Task[];

              let l_task = l_tasks[0];

              l_task = Object.assign(l_ut, l_task);

              taskArray.push(l_task);
              l_taskQuery.unsubscribe();
            });

          userTaskArray.push(l_ut);
          console.log(userTaskArray);
        }
        l_user_taskTaskQuery.unsubscribe();
      });
  });
  return taskArray;
  }

  async readTasks(): Promise<any[]> {
    let emailID;
    let userTaskArray: UserTask[] = [];
    let taskArray: Task[] = [];

    await this.afAuth.currentUser.then((data) => {
      if (data != null) {
        data.providerData.forEach(function (profile) {
          emailID = profile.email;
        });
      } else return;

      const l_user_taskTaskQuery = this.afs
        .collectionGroup('user_task', (ref) =>
          ref.where('userId', '==', emailID)
        )
        .valueChanges()
        .subscribe((data) => {
          console.log('important: ' + JSON.stringify(data));
          let l_userTaskArray = data as UserTask[];

          for (let i = 0; i < l_userTaskArray.length; i++) {
            const l_ut = l_userTaskArray[i];
            const l_taskQuery = this.afs
              .collectionGroup('task', (ref) =>
                ref.where('id', '==', l_ut.taskId)
              )
              .valueChanges()
              .subscribe((d) => {
                let l_tasks = d as Task[];

                let l_task = l_tasks[0];

                l_task = Object.assign(l_ut, l_task);

                taskArray.push(l_task);
                l_taskQuery.unsubscribe();
              });

            userTaskArray.push(l_ut);
            console.log(userTaskArray);
          }
          l_user_taskTaskQuery.unsubscribe();
        });
    });
    return taskArray;
  }

  getTaskById$(id): Observable<Task> {
    return this.afs
      .collection<Task>('users')
      .doc(id)
      .valueChanges()
      .pipe(first());
  }

  update(userTask: any) {
    /*let userTask1 = {
      userTaskId:"jioDFJWNVxLwyrlqHPrD",
      duration:"08:00",
      taskId:"1",
      timeEnd:"",
      timeStart:"",
      userId:"jaume.garcia@student.bit.es"

    }*/
    console.log("updateService: "+JSON.stringify(userTask))
    /*let itemDoc = this.afs.doc(`user_task/${userTask1.userTaskId}`)
   itemDoc.update(userTask1);*/
    return this.afs
      .collection<any>('user_task')
      .doc(userTask.userTaskId)
      .set(userTask);
  }

  read$(): Observable<Task[]> {
    return this.afs.collection<Task>('task').valueChanges();
  }

  async createUserTask(data): Promise<void> {
    let userTask1;
    console.log('createUser:' + JSON.stringify(data));
    await this.afAuth.currentUser.then((d) => {
      let emailID;
      if (d != null) {
        d.providerData.forEach(function (profile) {
          emailID = profile.email;
        });
      } else return;

      userTask1 = {
        userTaskId: this.afs.createId(),
        duration: '00:00',
        taskId: data.option,
        timeEnd: '',
        timeStart: '',
        userId: emailID,
      };
      return this.afs
        .collection<any>('user_task')
        .doc(userTask1.userTaskId)
        .set(userTask1);
    });
  }
}
