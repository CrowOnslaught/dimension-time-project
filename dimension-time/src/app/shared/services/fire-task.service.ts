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


   readTasksGroup():Observable<any[]>
  {
    let emailID;
    let taskArray: any[] = [];


      return  this.afs
      .collectionGroup('user_task', (ref) =>
        ref.where('duration', '!=', "00:00")
      ).valueChanges();

  }
  readSubTask():Observable<any[]>{



    return  this.afs
        .collectionGroup('task')
        .valueChanges();




  }


readTasks():Observable<any[]>{
  let emailId = localStorage.getItem("email");
    return this.afs.collectionGroup('user_task', (ref) =>ref.where('userId', '==', emailId)).valueChanges();
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
