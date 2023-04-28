import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {last, switchMap} from "rxjs";
import {v4 as uuid} from 'uuid';

import firebase from "firebase/compat/app";
import {ClipService} from "../../services/clip/clip.service";

@Component({
  selector: 'app-upload', templateUrl: './upload.component.html', styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  isDragOver = false;
  file: File | null = null;
  nextStep = false;

  showAlert = false;
  alertColor = 'blue';
  alertMessage = 'Please wait! Your video is being uploaded.';
  inSubmission = false;

  percentage = 0;

  showPercentage = false;

  user: firebase.User | null = null;
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)], nonNullable: true
  });
  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(private storage: AngularFireStorage, private auth: AngularFireAuth, private clipService: ClipService) {
    this.auth.user.subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

  uploadFile() {

    this.uploadForm.disable() // disable the form while uploading the file


    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait! Your video is being uploaded.';
    this.showPercentage = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    const task = this.storage.upload(clipPath, this.file)
    const ref = this.storage.ref(clipPath);

    task.percentageChanges().subscribe((percentage) => {
      this.percentage = percentage as number / 100;
    });

    task.snapshotChanges().pipe(last(), // emit the last event in the stream
      switchMap(() => ref.getDownloadURL()) // get the download url of the file
    ).subscribe({
      next: (url) => {

        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url
        }

        this.clipService.createClip(clip); // create the clip in the database after the file is uploaded

        this.alertColor = 'green';
        this.alertMessage = 'Success! Your clip is now ready to share with the world.';
        this.showPercentage = false;
      }, error: () => {

        this.uploadForm.enable(); // re-enable the form after the upload is complete

        this.alertColor = 'red';
        this.alertMessage = 'Oops! Something went wrong. Please try again.';
        this.inSubmission = true;
        this.showPercentage = false;
      }
    });

  }

  storeFile($event: Event) {
    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      this.file = null;
      return;
    }

    this.title.setValue(this.file.name.replace('.mp4', ''));

    this.nextStep = true;
  }

}
