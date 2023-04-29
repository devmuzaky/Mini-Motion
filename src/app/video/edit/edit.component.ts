import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import IClip from "../../models/iclip";
import {ModalService} from "../../services/modal/modal.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy{

  @Input() activeClip: IClip | null = null;

  constructor(private modal:  ModalService) {
  }

    ngOnInit(): void {
    this.modal.register('editClip') // register the modal with the modal service so we can open it
    }


    ngOnDestroy(): void {
        this.modal.unregister('editClip'); // unregister the modal when the component is destroyed, so we don't have a memory leak
    }

}
