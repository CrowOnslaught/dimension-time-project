import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Task } from '../model/task';
import { UserTask } from '../model/user-task';

@Injectable({
  providedIn: 'root'
})
export class FireTaskService {

  constructor(private afs : AngularFirestore, private afAuth: AngularFireAuth) { }

  readUserTasks$():Observable<UserTask[]>{
    return this.afs.collection<UserTask>('user_task').valueChanges();
  }
  readTasks$() : Observable <Task[]>
  {
    // let taskArray: Task[] = [];

    // const taskID$ = new Subject<string>();
    // const queryObservable2 = taskID$.pipe(
    //   switchMap(taskID =>
    //     this.afs.collection('task', ref => ref.where('id', '==', taskID)).valueChanges()
    //   ));

    // queryObservable2.subscribe(queriedItems2 =>
    //   {
    //     let l_task = queriedItems2[0] as Task;
    //     console.log("AA" + l_task);
    //     taskArray.push(l_task);
    //     // console.log("CCCC" + taskArray);
    //   })

    // const emailID$ = new Subject<string>();
    // const queryObservable = emailID$.pipe(
    //   switchMap(emailID =>
    //     this.afs.collection('user_task', ref => ref.where('userId', '==', emailID)).valueChanges()
    //   )
    // );

    // this.afAuth.currentUser.then(data =>
    //   {
    //     if(data != null)
    //       data.providerData.forEach(function (profile) {
    //         emailID$.next(profile.email);
    //       });
    //   });

    //   let l_userTask;
    //   queryObservable.subscribe(queriedItems =>
    //     {
    //       l_userTask = queriedItems as UserTask[];
    //       for (let ut of l_userTask)
    //       {
    //         console.log("BBBBBB " + ut.taskId);
    //         taskID$.next(ut.taskId);
    //       }
    //     });


    //   console.log(taskArray);
    //   return taskArray;

    let emailID;
    console.log("DDDD");

    this.afAuth.currentUser.then(data =>
      {
        if(data != null)
          data.providerData.forEach(function (profile) {
            emailID = profile.email;
          });
          console.log("CCCCCC");

          const l_userTaskQuery = this.afs.collectionGroup('user_task', ref => ref.where('userId', '==', emailID))
          .valueChanges();

          l_userTaskQuery.subscribe(data =>
            {
              let l_userTask = data as UserTask[];
              console.log("AA data " +data);
              console.log("BB userTask " + l_userTask);
              const l_taskQuery = this.afs.collectionGroup('task', ref => ref.where('id', '==', emailID))
              .valueChanges();
            })
      });

      return null;
  }

  getTaskById$(id):Observable<Task>{
    return this.afs.collection<Task>('users').doc(id).valueChanges().pipe(first());
  }


  update(user:UserTask): Promise<void>{
    return this.afs.collection<UserTask>('users').doc(user.id).update(user);
  }
}
