import {Component} from '@angular/core';
import {ModalService} from "../services/modal/modal.service";
import {AuthService} from "../user/services/auth.service";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {


  constructor(
    public modalService: ModalService,
    public auth: AuthService,
  ) {
  }

  ontoggle() {
    document.body.classList.toggle('dark-mode');
  }

  openModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggleModal('auth');
    console.log('open modal')
  }


}
