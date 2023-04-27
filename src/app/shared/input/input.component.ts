import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  constructor() {
  }

}
