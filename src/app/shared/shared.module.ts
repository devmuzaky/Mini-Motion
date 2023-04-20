import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    ModalComponent
  ],
  exports: [
    ModalComponent
    ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
