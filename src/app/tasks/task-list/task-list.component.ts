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

  taskTitleFilter: string = '';
  priorityFilter: string = '';
  statusFilter: string = '';
  filteredTasks: ITask[] =[];

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
      .getTasks()
      .subscribe((taskData: any) => {
        this.tasks = taskData;
        this.filteredTasks = this.tasks;
      });
    this.isLoading = false;
    this.userIsAuthenticated = this._authService.getIsAuth();

  }
  filterTasks() {
    // Apply your filter logic here using the filter variables
    this.filteredTasks = this.tasks.filter(task => {
      const titleMatch = task.title.toLowerCase().includes(this.taskTitleFilter.toLowerCase());
      const priorityMatch = this.priorityFilter === '' || task.priority === this.priorityFilter;
      const statusMatch = this.statusFilter === '' || task.status === this.statusFilter;

      return titleMatch && priorityMatch && statusMatch;
    });
  }

  // Function to reset filters
  resetFilters() {
    this.taskTitleFilter = '';
    this.priorityFilter = '';
    this.statusFilter = '';
    this.filterTasks(); // Call filter function to update the displayed tasks
  }
  onTaskDelete(id: string): void {
    this.isLoading = true;
    this._taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(obj => obj._id !== id);
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
