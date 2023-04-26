import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created...';
  alertColor = 'blue';

  registerForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
      {updateOn: 'blur'}
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    age: [
      '',
      [
        Validators.required,
        Validators.min(18)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})")

      ]
    ],
    confirmPassword: [
      '',
      [
        Validators.required,

      ]
    ],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern("^[0-9]{10}$")
      ]
    ],

  });

  constructor(private formBuilder: FormBuilder) {
  }

  register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created...';
    this.alertColor = 'blue';
  }


}
