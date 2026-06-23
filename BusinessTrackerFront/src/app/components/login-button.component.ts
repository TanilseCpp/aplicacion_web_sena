import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-button',
  standalone: true,
  template: `
    <button (click)="login()" class="btn-login">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      Iniciar Sesión
    </button>
  `,
  styles: [`
    .btn-login {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      font-size: 0.9rem;
      font-weight: 600;
      font-family: inherit;
      color: var(--color-text-light, #fff);
      background-color: var(--color-accent, #1ABC9C);
      border: none;
      border-radius: var(--border-radius, 0.5rem);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-login:hover {
      background-color: var(--color-accent-dark, #16A085);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(26, 188, 156, 0.4);
    }

    .btn-login:active {
      transform: translateY(0);
    }

    .btn-login svg {
      flex-shrink: 0;
    }
  `]
})
export class LoginButtonComponent {
  private router = inject(Router);

  login(): void {
    this.router.navigate(['/login']);
  }
}
