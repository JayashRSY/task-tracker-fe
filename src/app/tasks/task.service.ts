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
  private taskUpdated = new Subject<{ tasks: ITask[]; taskCount: number }>();
  url = environment.apiUrl;

  constructor(private http: HttpClient, private routers: Router) {}

  getTaskUpdateListener() {
    return this.taskUpdated.asObservable();
  }

  getTasks() {
    this.http
      .get<{ message: string; tasks: any; maxTasks: number }>(
        `${this.url}getTasks`
      )
      .pipe(
        map((taskData: any) => {
          return {
            tasks: taskData.tasks.map((task: any) => {
              return {
                title: task.title,
                content: task.content,
                id: task._id,
                imagePath: task.imagePath,
                creator: task.creator,
              };
            }),
            maxTasks: taskData.maxTasks,
          };
        })
      )
      .subscribe((transformedTaskData) => {
        this.tasks = transformedTaskData.tasks;
        this.taskUpdated.next({
          tasks: [...this.tasks],
          taskCount: transformedTaskData.maxTasks,
        });
      });
    return [...this.tasks];
  }
  getTask(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: File;
      creator: string;
    }>(`${this.url}getTask/${id}`);
  }
  addTask(title: string, content: string, image: File) {
    const taskData = new FormData();
    taskData.append('title', title);
    taskData.append('content', content);
    taskData.append('image', image, title);
    this.http
      .post<{ message: string; task: ITask }>(`${this.url}addTask`, taskData)
      .subscribe((res) => {
        this.routers.navigate(['/']);
      });
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.url}deleteTask/${id}`);
  }
  // updateTask(id: string, title: string,) {
  //   let taskData: ITask | FormData;
  //   if (typeof image === 'object') {
  //     taskData = new FormData();
  //     taskData.append('id', id);
  //     taskData.append('title', title);
  //     taskData.append('content', content);
  //     taskData.append('image', image, title);
  //   } else {
  //     taskData = {
  //       id: id,
  //       title: title,
  //       creator: null,
  //     };
  //   }
  //   this.http
  //     .put(`${this.url}updateTask/${id}`, taskData)
  //     .subscribe((response) => {
  //       this.routers.navigate(['/']);
  //     });
  // }
}
