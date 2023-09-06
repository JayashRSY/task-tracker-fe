import { NgModule } from '@angular/core';


import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorComponent } from './error/error.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatIconModule } from '@angular/material/icon';

const moduleList = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: moduleList,
  exports: [moduleList, LoadingSpinnerComponent],
  declarations: [
    ErrorComponent,
    LoadingSpinnerComponent
  ],
})
export class AngularMaterialModule { }
