import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {delay, map, Observable} from "rxjs";
import IUser from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = this.auth.authState.pipe(
      map(user => !!user)
    )

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
  }

  public async createUser(userData: IUser) {

    if (!userData.password) {
      throw new Error('Password not provided!')
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password)
    console.log(userCred)

    if (!userCred.user) {
      throw new Error("User can't be found! Please try again later.")
    }

    await this.usersCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    })

    await userCred.user?.updateProfile({
      displayName: userData.name
    })
  }

}
