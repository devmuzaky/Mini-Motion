import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

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
}
