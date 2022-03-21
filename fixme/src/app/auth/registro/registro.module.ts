import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import { ValidatorsModule } from 'src/app/validators/validators.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    ValidatorsModule,
  ],
  declarations: [RegistroPage]
})
export class RegistroPageModule {}
