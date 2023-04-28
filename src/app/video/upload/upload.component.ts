import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  isDragOver = false;
  file: File | null = null;
  nextStep = false;

  constructor(private fb: FormBuilder) {
  }



  storeFile($event: DragEvent) {
    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      this.file = null;
      return;
    }

    console.log(this.file)

    this.nextStep = true;
  }

}
