import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FireUserService {

  constructor(private afs: AngularFirestore) { }

  read$():Observable<User[]>{

    return this.afs.collection<User>('users').valueChanges();

  }

  getById$(id):Observable<User>{
    return this.afs.collection<User>('users').doc(id).valueChanges().pipe(first());

  }

  create(user:User): Promise<void> {

    return this.afs.collection<User>('users').doc(user.id).set(user);
  }

  delete(user:User): Promise<void>{
    return this.afs.collection<User>('users').doc(user.id).delete();
  }

  update(user:User): Promise<void>{
    return this.afs.collection<User>('users').doc(user.id).update(user);
  }

}
