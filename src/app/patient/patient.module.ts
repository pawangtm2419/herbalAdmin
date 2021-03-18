import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient.component';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: PatientComponent }
];

@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }
