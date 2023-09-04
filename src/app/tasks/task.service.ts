import { Injectable } from '@angular/core';
import { ITask } from './task.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];
  private taskUpdated = new Subject<any>();
  url = environment.apiUrl;

  constructor(private http: HttpClient, private routers: Router) { }

  // getTaskUpdateListener() {
  //   return this.taskUpdated.asObservable();
  // }

  getTasks() {
    return this.http
      .get(`${this.url}getTasks`)

  }
  getTask(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      description: string,
      dueDate: string,
      priority: string,
      status: string,
      creator: string,
    }>(`${this.url}getTask/${id}`);
  }
  addTask(title: string, description: string, dueDate: string, priority: string, status: string) {
    let payload = {
      title,
      description,
      dueDate,
      priority,
      status,
      creator: null,
    }
    this.http
      .post<{ message: string; task: ITask }>(`${this.url}addTask`, payload)
      .subscribe((res) => {
        this.routers.navigate(['/tasks']);
      });
  }
  deleteTask(id: string) {
    return this.http.delete(`${this.url}deleteTask/${id}`);
  }
  updateTask(id: string, title: string, description: string, dueDate: string, priority: string, status: string) {
    let payload = {
      id,
      title,
      description,
      dueDate,
      priority,
      status,
      creator: null,
    }
    this.http
      .put(`${this.url}updateTask/${id}`, payload)
      .subscribe((response) => {
        this.routers.navigate(['/tasks']);
      });
  }
}
