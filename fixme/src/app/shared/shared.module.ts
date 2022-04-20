import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { IonicModule } from '@ionic/angular';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { FormsModule } from '@angular/forms';
import { ValidatorsModule } from '../validators/validators.module';




@NgModule({
  declarations: [ProductCardComponent, ProfileFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ValidatorsModule
      ],
  exports: [
    ProductCardComponent,
    ProfileFormComponent
  ]
})
export class SharedModule { }
