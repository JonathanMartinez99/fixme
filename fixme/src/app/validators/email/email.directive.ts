import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[repeatedEmail]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailDirective, multi: true }
  ]
})
export class EmailDirective implements Validator{
  @Input() repeatedEmail!:string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.repeatedEmail !== control.value) {
      return { repeatedEmail: true }; // Error returned
    }
    return null; // No errors
  }

}
