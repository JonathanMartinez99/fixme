import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ValidatorsModule } from '../validators/validators.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ValidatorsModule
  ]
})
export class AuthModule { }
