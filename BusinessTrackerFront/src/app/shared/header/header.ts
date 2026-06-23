import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginButtonComponent } from '../../components/login-button.component';
import { LogoutButtonComponent } from '../../components/logout-button.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, LoginButtonComponent, LogoutButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly activeRoute = signal('home');

  setActive(route: string): void {
    this.activeRoute.set(route);
  }
}
