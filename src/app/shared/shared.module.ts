import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './components/modal/modal.component';
import {TabsContainerComponent} from './components/tabs-container/tabs-container.component';
import {TabComponent} from './components/tab/tab.component';
import {InputComponent} from './components/input/input.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AlertComponent} from './components/alert/alert.component';
import { EventBlockerDirective } from './directives/event-blocker.directive';


@NgModule({
  declarations: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ]

})
export class SharedModule {
}
