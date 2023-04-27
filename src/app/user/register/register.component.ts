import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import IUser from "../models/user";
import {AuthService} from "../services/auth.service";
import {EmailTaken} from "../Validitors/email-taken";
import {RegisterValidator} from "../Validitors/register-validator";

@Component({
  selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created...';
  alertColor = 'blue';

  inSubmission = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private emailTaken: EmailTaken) {
  }

  // registerForm = this.formBuilder.group({
  //   name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),]],
  //   email: ['', [Validators.required, Validators.email]],
  //   age: ['', [Validators.required, Validators.min(18)]],
  //   password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
  //   confirmPassword: ['', [Validators.required]],
  //   phoneNumber: ['', [Validators.required]]
  // },
  //   {
  //     validator: RegisterValidator.match('password', 'confirmPassword')
  //   }
  //   );


  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ], [this.emailTaken.validate])
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password = new  FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new FormControl('', [
    Validators.required
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])


  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  }, [RegisterValidator.match('password', 'confirm_password')])

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


