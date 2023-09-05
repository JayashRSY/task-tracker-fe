import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  private authStatusSubs: Subscription = new Subscription();

  constructor(public _authService: AuthService, public _loadingService: LoadingService) { }

  ngOnInit(): void {
    this.authStatusSubs = this._authService.getAuthStatusListener()
      .subscribe(isAuthStatus => {
      })
  }
  onLogin(form: NgForm): void {
    if (form.invalid) {
      return
    }
    this._authService.loginUser(form.value.email, form.value.password)
  }

  ngOnDestroy(): void {
    this.authStatusSubs.unsubscribe()
  }
}
