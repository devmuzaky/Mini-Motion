import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    email: 'moe_zaky@gmail.com',
    password: 'Mm123456'
  }

  showAlert = false;
  alertMessage = 'Please wait while we log you in...';
  alertColor = 'primary';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {

  }

  async login() {
    this.showAlert = true;
    this.inSubmission = true;
    this.alertMessage = 'Please wait while we log you in...';
    this.alertColor = 'primary';
    try {
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
    } catch (e) {
      this.inSubmission = false;
      this.alertMessage = "There was an error logging you in. Please try again."
      this.alertColor = 'red';

      return
    }

    this.alertMessage = "You have been logged in successfully. Redirecting you to the dashboard..."
    this.alertColor = 'green';

  }
}
