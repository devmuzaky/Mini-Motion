import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot
} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {BehaviorSubject, combineLatest, map, Observable, of, switchMap} from "rxjs";
import IClip from "../../models/iclip";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClipService implements Resolve<IClip | null> {

  pageClips: IClip[] = [];
  pendingReq = false;

  public clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.clipsCollection = db.collection<IClip>('clips');
  }

  // this.db.collection: this is the collection we want to add the clip to
  createClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(clip); // add the clip to the collection and return the reference
  }

  getUserClips(sort$: BehaviorSubject<string>) {
    return combineLatest([
      this.auth.user,
      sort$
    ]).pipe(
      switchMap(values => {

        const [user, sort] = values;

        if (!user) {
          return of([]) // return an empty array if the user is not logged in
        }
        const query = this.clipsCollection.ref.where(
          'uid', '==', user.uid
        ).orderBy(
          'timestamp',
          sort === '1' ? 'desc' : 'asc'
        ); // get the clips where the uid is equal to the user's uid
        return query.get(); // return the query results as an observable (this is an observable of a firebase query snapshot)
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    )
  }

  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({
      title
    })
  }

  async deleteClip(clip: IClip) {
    const clipRef = this.storage.ref(`clips/${clip.fileName}`);
    const screenshotRef = this.storage.ref(
      `screenshots/${clip.screenshotFileName}`
    )
    await clipRef.delete();
    await screenshotRef.delete()

    await this.clipsCollection.doc(clip.docID).delete();
  }


  async getClips() {

    if (this.pendingReq) {
      return;
    }

    this.pendingReq = true;

    let query = this.clipsCollection.ref
      .orderBy('timestamp', 'desc')
      .limit(9);

    const {length} = this.pageClips;

    if (length) {
      const lastDocID = this.pageClips[length - 1].docID;
      const lastDoc = await this.clipsCollection.doc(lastDocID).get().toPromise();
      query = query.startAfter(lastDoc);

    }

    const snapshot = await query.get();

    snapshot.forEach(doc => {
      this.pageClips.push({
        docID: doc.id,
        ...doc.data()
      });
    })

    this.pendingReq = false;

  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClip | null> {
    return this.clipsCollection.doc(route.params['id'])
      .get()
      .pipe(
        map(snapshot => {
          const data = snapshot.data()

          if (!data) {
            this.router.navigate(['/'])
            return null
          }

          return data;

        })
      )
  }

}
