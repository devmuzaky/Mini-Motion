import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() modalID: string = '';

  constructor(public modalService: ModalService,
              private elRef: ElementRef) {
  }

  closeModal() {
    this.modalService.toggleModal(this.modalID);
  }

  ngOnInit(): void {
    // append modal to body when created to avoid z-index issues or styling issues with parent elements
    document.body.appendChild(this.elRef.nativeElement);
  }

  ngOnDestroy(): void {
    // remove modal from body when destroyed
    // this.elRef.nativeElement.remove();
    document.body.removeChild(this.elRef.nativeElement);
  }

}
