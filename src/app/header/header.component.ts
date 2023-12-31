import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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

  onLogout() {
    this._authService.logoutUser()
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
