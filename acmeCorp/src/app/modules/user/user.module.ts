import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms'

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { MaskDirective } from 'src/app/directives/mask/mask.directive';


@NgModule({
  declarations: [
    UserComponent,
    FormComponent,
    MaskDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
