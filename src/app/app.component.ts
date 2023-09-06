import { Component } from '@angular/core';
import { LoadingService } from './shared/loading.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public _loadingService: LoadingService, private _authService: AuthService) { }
  ngOnInit(): void {
    this._authService.autoAuthUser()
  }
}
