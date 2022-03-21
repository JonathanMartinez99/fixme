import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './email/email.directive';
import { MinDateDirective } from './min-date/min-date.directive';
import { PasswordDirective } from './passwords/password.directive';



@NgModule({
  declarations: [
    EmailDirective,
    MinDateDirective,
    PasswordDirective
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    EmailDirective,
    MinDateDirective,
    PasswordDirective
  ]
})
export class ValidatorsModule { }
