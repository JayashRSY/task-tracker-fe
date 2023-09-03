import { NgModule } from '@angular/core';

import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../shared/angular-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [TaskCreateComponent, TaskListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgbModule,
  ],
  exports: [TaskCreateComponent, TaskListComponent],
})
export class TasksModule {}
