import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[repeatedPassword]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordDirective, multi: true }
  ]
})
export class PasswordDirective implements Validator {

  @Input() repeatedPassword!:string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.repeatedPassword !== control.value || this.repeatedPassword.length < 4) {
      return { repeatedPassword: true }; // Error returned
    }
    return null; // No errors
  }

}
