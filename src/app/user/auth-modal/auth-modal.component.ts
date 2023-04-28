import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal/modal.service";

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.modalService.register('auth');
  }

  ngOnDestroy() {
    this.modalService.unregister('auth');
  }

}
