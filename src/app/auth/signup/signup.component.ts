import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private authStatusSubs: Subscription = new Subscription();

  constructor(public _authService: AuthService, public _loadingService: LoadingService) { }

  ngOnInit(): void {
    this.authStatusSubs = this._authService.getAuthStatusListener()
      .subscribe(isAuthStatus => {
      })
    }
  onSignup(form: NgForm): void {
    if (form.invalid) {
      return
    }
    this._authService.signupUser(form.value.email, form.value.password)
  }
  ngOnDestroy(): void {
    this.authStatusSubs.unsubscribe()
  }
}
