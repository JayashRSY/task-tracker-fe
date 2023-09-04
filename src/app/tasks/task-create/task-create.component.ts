import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../task.interface';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  btnText: string = 'Save Task';
  node: string = 'createTask';
  editingTask: ITask = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
  };
  private taskId: string = '';
  isLoading: boolean = false;
  private authStatusSubs: Subscription = new Subscription();
  constructor(
    private _taskService: TaskService,
    public route: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) {
    this.taskForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['Low', Validators.required],
      status: ['New', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authStatusSubs = this._authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.taskForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
      dueDate: new FormControl(null, {
        validators: [Validators.required],
      }),
      priority: new FormControl(null, {
        validators: [Validators.required],
      }),
      status: new FormControl(null, {
        validators: [Validators.required],
      }),

    });
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('taskId')) {
        this.btnText = 'Save Task';
        this.node = 'editTask';
        this.taskId = String(paramMap.get('taskId'));
        console.log("🚀 ~ file: task-create.component.ts:73 ~ TaskCreateComponent ~ this.route.paramMap.subscribe ~ this.taskId:", this.taskId);
        this.isLoading = true;
        this._taskService.getTask(this.taskId).subscribe((taskData) => {
          this.editingTask = {
            id: taskData._id,
            title: taskData.title,
            description: taskData.description,
            dueDate: taskData.dueDate,
            priority: taskData.priority,
            status: taskData.status,
          };
          this.taskForm.setValue({
            title: this.editingTask.title,
            description: this.editingTask.description,
            dueDate: this.editingTask.dueDate,
            priority: this.editingTask.priority,
            status: this.editingTask.status,
          });
          this.isLoading = false;
        });
      } else {
        this.btnText = 'Create Task';
        this.node = 'createTask';
        this.taskId = '';
      }
    });
  }

  onSaveTask() {
    if (this.taskForm.invalid) {
      return;
    }
    if (this.node === 'createTask') {
      this.isLoading = true;
      this._taskService.addTask(
        this.taskForm.value.title,
        this.taskForm.value.description,
        this.taskForm.value.dueDate,
        this.taskForm.value.priority,
        this.taskForm.value.status,
      );
      this.isLoading = false;
    } else if (this.node === 'editTask') {
      this.isLoading = true;
      this._taskService.updateTask(
        this.taskId,
        this.taskForm.value.title,
        this.taskForm.value.description,
        this.taskForm.value.dueDate,
        this.taskForm.value.priority,
        this.taskForm.value.status,
      );
      this.isLoading = false;
    }
    this.taskForm.reset();
  }
  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }
}
