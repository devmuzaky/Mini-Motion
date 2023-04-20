import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';

@NgModule({
  declarations: [
    AuthModalComponent
  ],
  exports: [
    AuthModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule {
}
