import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {


  contactForm = this.fb.group({
    message: ['', [Validators.required]]
  });


  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    window.open(`mailto:devmuzaky@gmail.com?subject=Contact%20Form&body=${this.contactForm.value.message}`);
    this.contactForm.reset();
  }
}
