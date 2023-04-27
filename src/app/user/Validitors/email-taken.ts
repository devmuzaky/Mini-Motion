import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {

  constructor(private auth: AngularFireAuth) {
  }

  validate = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this.auth.fetchSignInMethodsForEmail(control.value).then(response => response.length ? {'emailTaken': true} : null)
  }

}
