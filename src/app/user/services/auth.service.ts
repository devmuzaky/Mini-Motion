import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {delay, filter, map, Observable, of, switchMap} from "rxjs";
import IUser from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>
  private redirect: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = this.auth.authState.pipe(
      map(user => !!user)
    )

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({})),
    ).subscribe(data => {
      this.redirect = data['authOnly'] ?? false;
    })
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

  public  async logout($event?: MouseEvent) {
    if ($event) {
      $event.preventDefault();
    }
    await this.auth.signOut();

    if (this.redirect) {
      await this.router.navigateByUrl('/')
    }
  }

}
