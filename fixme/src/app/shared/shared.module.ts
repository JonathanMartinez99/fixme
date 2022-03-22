import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BotonesRegistroComponent } from './botones-registro/botones-registro.component';



@NgModule({
  declarations: [BotonesRegistroComponent],
  imports: [
    CommonModule, IonicModule.forRoot(), RouterModule
  ]
})
export class SharedModule { }
