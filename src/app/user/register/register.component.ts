import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]
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
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$") //at least one uppercase letter, one lowercase letter and one number
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


}
