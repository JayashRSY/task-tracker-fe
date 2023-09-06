import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  userIsAuthenticated: boolean = false;
  private authListenerSubs: Subscription

  constructor(private _authService: AuthService) {
    this.userIsAuthenticated = this._authService.getIsAuth()
    this.authListenerSubs = this._authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
