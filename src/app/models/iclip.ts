import firebase from "firebase/compat/app";


export default interface IClip {
  uid: string;
  displayName: string;
  title: string;
  fileName: string;
  url: string;
  timestamp: firebase.firestore.FieldValue; // server timestamp is a special type of field value that is calculated on the server
  docId?: string;
}

