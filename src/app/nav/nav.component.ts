import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ModalService} from "../services/modal.service";
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
    private afAuth: AngularFireAuth
  ) {

  }

  openModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggleModal('auth');
    console.log('open modal')
  }

  async logout($event: MouseEvent) {
    $event.preventDefault();
    await this.afAuth.signOut();
  }
}
