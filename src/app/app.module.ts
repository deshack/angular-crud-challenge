import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class AppModule { }
