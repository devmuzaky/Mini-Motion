import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot
} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {BehaviorSubject, combineLatest, map, of, switchMap} from "rxjs";
import IClip from "../../models/iclip";

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
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
    await clipRef.delete();

    await this.clipsCollection.doc(clip.docID).delete();
  }
}
