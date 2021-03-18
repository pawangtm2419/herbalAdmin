import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: AppointmentComponent }
];

@NgModule({
  declarations: [
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ]
})
export class AppointmentModule { }
