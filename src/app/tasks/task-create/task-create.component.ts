import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  form!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['low', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Handle form submission here, e.g., send data to a service
      console.log(this.form.value);
    }
  }
}
