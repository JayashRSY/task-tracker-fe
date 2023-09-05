import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = new BehaviorSubject<boolean>(false);

  isLoading$ = this.isLoading.asObservable();

  show() {
    console.log("showwwwwwwwwww");
    this.isLoading.next(true);
  }

  hide() {
      console.log("hideeee");
    this.isLoading.next(false);
  }
}
