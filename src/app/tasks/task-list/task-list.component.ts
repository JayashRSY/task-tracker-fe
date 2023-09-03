import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { ITask } from '../task.interface';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: ITask[] = [
    {
      id: 1,
      title: 'Finish Angular Project',
      description: 'Complete the tasks module and add testing.',
      dueDate: new Date('2023-09-15'),
      priority: 'High',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Write Documentation',
      description: 'Create documentation for the project.',
      dueDate: new Date('2023-09-20'),
      priority: 'Medium',
      status: 'Todo',
    },
    {
      id: 3,
      title: 'Bug Fixing',
      description: 'Resolve critical bugs in the application.',
      dueDate: new Date('2023-09-10'),
      priority: 'High',
      status: 'In Progress',
    },
    {
      id: 4,
      title: 'Code Review',
      description: 'Review and provide feedback on team members\' code.',
      dueDate: new Date('2023-09-25'),
      priority: 'Low',
      status: 'Todo',
    },
    {
      id: 5,
      title: 'Testing',
      description: 'Write unit tests and integration tests for the application.',
      dueDate: new Date('2023-09-12'),
      priority: 'Medium',
      status: 'In Progress',
    },
  ];
  isLoading: boolean = false;
  totalTasks: number = 10;
  tasksPerPage: number = 2;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private tasksSub: Subscription = new Subscription();
  private authListenerSubs: Subscription | undefined;
  userIsAuthenticated: boolean = false;
  userId: string | null = '';
  constructor(private _taskService: TaskService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._taskService.getTasks();
    this.userId = this._authService.getUserId();
    this.tasksSub = this._taskService
      .getTaskUpdateListener()
      .subscribe((taskData: { tasks: ITask[]; taskCount: number }) => {
        this.tasks = taskData.tasks;
        this.totalTasks = taskData.taskCount;
      });
    this.isLoading = false;
    this.userIsAuthenticated = this._authService.getIsAuth();
    this.authListenerSubs = this._authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this._authService.getUserId();
      });
  }
  ontaskEdit(id: string): void {
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
  // onChangedPage(pageData: PageEvent) {
  //   this.isLoading = true;
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.tasksPerPage = pageData.pageSize;
  //   this._taskService.getTasks();
  // }
  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
    // this.authListenerSubs.unsubscribe();
  }
}
