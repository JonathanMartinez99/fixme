import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[minDate]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinDateDirective, multi: true },
  ],
})
export class MinDateDirective {

  @Input() minDate!: string;

  validate(control: AbstractControl): ValidationErrors | null {

    let edad = 0;
    let mes = -1;
    let dia = -1;
    if(this.minDate && control.value){
      edad = Number(this.minDate.substring(0,4)) - Number(control.value.substring(0,4));
      mes = Number(control.value.substring(5,7)) - Number(this.minDate.substring(5,7));
      dia = Number(control.value.substring(8,10)) - Number(this.minDate.substring(8,10));
    }

    if( control.value && Number(control.value.substring(0,4)) > 1900){
      if ((this.minDate && control.value) && edad < 19) {
        if(edad < 18)
        {
          return { minDate: true }; // Error returned
        }
        else if(edad === 18){
          if(mes > 0){
            return { minDate: true }; // Error returned
          }
          if(dia > 0){
            return { minDate: true }; // Error returned
          }
        }

      }
      return null; // No errors
    }
    else{
      return { minDate: true }; // Error returned
    }


  }

}
