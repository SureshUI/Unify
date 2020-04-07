import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule  } from '@angular/material/datepicker';
import {MatFormFieldModule  } from '@angular/material/form-field';
import {MatInputModule  } from '@angular/material/input';
import {MatNativeDateModule  } from '@angular/material';

import { MainRoutingModule, MainRoutingComponents } from './main-routing.module';



@NgModule({
  declarations: [MainRoutingComponents],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
