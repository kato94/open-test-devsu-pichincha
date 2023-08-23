import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { InputDateComponent } from './input-date/input-date.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    HeaderComponent,
    InputComponent,
    InputDateComponent,
    ContextMenuComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    InputComponent,
    InputDateComponent,
    ContextMenuComponent,
    NotificationComponent,
  ]
})
export class SharedModule { }
