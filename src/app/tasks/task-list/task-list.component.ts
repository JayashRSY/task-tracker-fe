import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { ITask } from '../task.interface';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: ITask[] = [];
  isLoading: boolean = false;
  private tasksSub: Subscription = new Subscription();
  private authListenerSubs: Subscription;
  userIsAuthenticated: boolean = false;
  userId: string | null = '';
  constructor(private _taskService: TaskService, private _authService: AuthService) {
    this.authListenerSubs = this._authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this._authService.getUserId();
      });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._taskService.getTasks();
    this.userId = this._authService.getUserId();
    this.tasksSub = this._taskService
      .getTaskUpdateListener()
      .subscribe((taskData: any) => {
        this.tasks = taskData.tasks;
        console.log("🚀 ~ file: task-list.component.ts:38 ~ TaskListComponent ~ .subscribe ~ taskData.tasks:", taskData.tasks);
      });
    this.isLoading = false;
    this.userIsAuthenticated = this._authService.getIsAuth();

  }
  onTaskEdit(id: string): void {
    this._taskService.getTask(id);
  }

  onTaskDelete(id: string): void {
    this.isLoading = true;
    this._taskService.deleteTask(id).subscribe(
      () => {
        this._taskService.getTasks();
      },
      () => {
        this.isLoading = false;
      }
    );
    this.isLoading = false;
  }
  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }
}