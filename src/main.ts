import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import firebase from "firebase/compat/app";

import {AppModule} from './app/app.module';
import {environment} from "./environments/environment";
import 'firebase/compat/auth'


if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(environment.firebase)


let appInitialized = false;

firebase.auth().onAuthStateChanged(() => {
  if (!appInitialized) {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
    console.log('App initialized!')

  }
  appInitialized = true;
})
