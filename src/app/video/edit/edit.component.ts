import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import IClip from "../../models/iclip";
import {ClipService} from "../../services/clip/clip.service";
import {ModalService} from "../../services/modal/modal.service";

@Component({
  selector: 'app-edit', templateUrl: './edit.component.html', styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null;
  @Output() update = new EventEmitter();

  showAlert: boolean = false;
  alertColor: string = 'blue';
  alertMessage: string = 'Please wait! Updating your clip...';
  inSubmission: boolean = false;

  clipID = new FormControl('', {
    nonNullable: true
  });
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)], nonNullable: true
  });
  editForm = new FormGroup({
    title: this.title, id: this.clipID
  },);

  constructor(private modal: ModalService, private clipService: ClipService) {
  }

  ngOnInit(): void {
    this.modal.register('editClip') // register the modal with the modal service so we can open it
  }


  ngOnDestroy(): void {
    this.modal.unregister('editClip'); // unregister the modal when the component is destroyed, so we don't have a memory leak
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }
    if (!this.activeClip.docID) return;
    this.inSubmission = false;
    this.showAlert = false;
    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }

  async submit() {

    if (!this.activeClip) {
      return;
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait! Updating your clip...';
    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
    } catch (e) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMessage = 'There was an error updating your clip. Please try again.';
      return;
    }

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMessage = 'Your clip has been updated!';

  }
}
