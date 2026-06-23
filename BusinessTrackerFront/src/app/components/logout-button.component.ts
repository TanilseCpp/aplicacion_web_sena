import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  template: `
    <button (click)="logout()" class="btn-logout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      Cerrar Sesión
    </button>
  `,
  styles: [`
    .btn-logout {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.45rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      font-family: inherit;
      color: rgba(255, 255, 255, 0.85);
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: var(--border-radius, 0.5rem);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-logout:hover {
      background-color: var(--color-danger, #E74C3C);
      border-color: var(--color-danger, #E74C3C);
      color: #fff;
      transform: translateY(-1px);
    }

    .btn-logout:active {
      transform: translateY(0);
    }
  `]
})
export class LogoutButtonComponent {
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
