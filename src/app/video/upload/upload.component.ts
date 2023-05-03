import {Component, OnDestroy} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {combineLatest, last, switchMap} from "rxjs";
import {v4 as uuid} from 'uuid';

import firebase from "firebase/compat/app";
import {ClipService} from "../../services/clip/clip.service";
import {FfmpegService} from "../../services/ffmpeg/ffmpeg.service";

@Component({
  selector: 'app-upload', templateUrl: './upload.component.html', styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnDestroy {

  isDragOver = false
  file: File | null = null
  nextStep = false

  showAlert = false
  alertColor = 'blue'
  alertMessage = 'Please wait! Your video is being uploaded.'
  inSubmission = false

  percentage = 0

  showPercentage = false

  user: firebase.User | null = null

  task?: AngularFireUploadTask

  screenshots: string[] = []
  selectedScreenshot: string = ''
  screenshotTask?: AngularFireUploadTask


  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)], nonNullable: true
  });
  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipService: ClipService,
    private router: Router,
    public ffmpegService: FfmpegService
  ) {
    this.auth.user.subscribe(user => this.user = user);
    this.ffmpegService.init();
  }

  ngOnDestroy() {
    this.task?.cancel(); // cancel the upload if the user leaves the page
  }

  async uploadFile() {
    this.uploadForm.disable() // disable the form while uploading the file
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait! Your video is being uploaded.';
    this.showPercentage = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    const screenshotBlob = await this.ffmpegService.blobFromUrl(this.selectedScreenshot);
    const screenshotPath = `screenshots/${clipFileName}.png`;

    this.task = this.storage.upload(clipPath, this.file)
    const ref = this.storage.ref(clipPath);

    this.screenshotTask = this.storage.upload(screenshotPath, screenshotBlob);


    combineLatest([
      this.task.percentageChanges(),
      this.screenshotTask.percentageChanges()
    ]).subscribe((progress) => {
      const [clipProgress, screenshotProgress] = progress
      if (!clipProgress || !screenshotProgress) {
        return;
      }
      const percentage = clipProgress + screenshotProgress;
      this.percentage = percentage as number / 200;
    });

    this.task.snapshotChanges().pipe(last(), // emit the last event in the stream
      switchMap(() => ref.getDownloadURL()) // get the download url of the file
    ).subscribe({
      next: async (url) => {

        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        const clipDocRef = await this.clipService.createClip(clip); // create the clip in the database and get the reference

        this.alertColor = 'green';
        this.alertMessage = 'Success! Your clip is now ready to share with the world.';
        this.showPercentage = false;

        setTimeout(() => {
          this.router.navigate(['/clip', clipDocRef.id]); // navigate to the clip page after 1 second of showing the success message
        }, 1000);

      }, error: () => {

        this.uploadForm.enable(); // re-enable the form after the upload is complete

        this.alertColor = 'red'; // show an error message
        this.alertMessage = 'Oops! Something went wrong. Please try again.';
        this.inSubmission = true; // re-enable the form after the upload is complete
        this.showPercentage = false; // re-enable the form after the upload is complete
      }
    });

  }

  async storeFile($event: Event) {

    if (this.ffmpegService.isRunning) {
      return;
    }

    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null;
    // check if the file is a video and set the file to null if it is not
    if (!this.file || this.file.type !== 'video/mp4') {
      this.file = null;
      return;
    }

    this.screenshots = await this.ffmpegService.getScreenShots(this.file);

    this.selectedScreenshot = this.screenshots[0];

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ""));

    this.nextStep = true;
  }


}

