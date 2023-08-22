import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { InputDateComponent } from './input-date/input-date.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    InputComponent,
    InputDateComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    InputComponent,
    InputDateComponent,
  ]
})
export class SharedModule { }
