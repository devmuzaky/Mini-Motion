import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from "@angular/fire/compat/firestore";
import IClip from "../../models/iclip";

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(
    private db: AngularFirestore
  ) {
    this.clipsCollection = db.collection<IClip>('clips');
  }


  //
  createClip(clip: IClip):  Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(clip); // add the clip to the collection and return the reference
  }
}
