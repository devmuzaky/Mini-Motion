import {Component} from '@angular/core';
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(
    public modalService: ModalService
  ) {
  }

  openModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggleModal();
  }
}
