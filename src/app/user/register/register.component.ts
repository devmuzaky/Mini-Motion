import {Component, Inject} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormBuilder, Validators} from "@angular/forms";
import IUser from "../models/user";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created...';
  alertColor = 'blue';

  inSubmission = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
  }

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(18)]],
    password: ['', [Validators.required, Validators.minLength(8),
      Validators.maxLength(20)
    ]],
    confirmPassword: ['', [Validators.required,

    ]],
    phoneNumber: ['', [Validators.required]],

  });


  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created...';
    this.alertColor = 'blue';
    this.inSubmission = true;


    try {
      await this.auth.createUser(this.registerForm.value as IUser);

    } catch (e) {
      this.alertMsg = "Something went wrong! Please try again later."
      this.alertColor = 'red';
      return
    }

    this.alertMsg = "Your account has been created successfully!"
    this.alertColor = 'green';
  }


}
