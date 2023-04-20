import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './modal/modal.component';
import {TapsContainerComponent} from './taps-container/taps-container.component';
import {TapComponent} from './tap/tap.component';


@NgModule({
  declarations: [
    ModalComponent,
    TapsContainerComponent,
    TapComponent
  ],
  exports: [
    ModalComponent,
    TapsContainerComponent,
    TapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
