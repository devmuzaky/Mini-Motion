import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appEventBlocker]'
})
export class EventBlockerDirective {


  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  @HostListener('dragleave', ['$event'])
  public handleEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
  constructor() { }

}
