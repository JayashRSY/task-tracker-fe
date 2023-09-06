import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { AuthGuard } from './auth/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createTask',
    component: TaskCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editTask/:taskId',
    component: TaskCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
