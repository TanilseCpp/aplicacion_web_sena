import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (!isLoggedIn()) {
      <div class="profile-loading">
        <p>No has iniciado sesión.</p>
      </div>
    } @else if (user$ | async; as user) {
      <div class="profile-container">
        <div class="avatar-wrapper">
          <div class="avatar-placeholder">
            {{ getInitials(user.username || user.email || 'U') }}
          </div>
          <div class="avatar-status-dot"></div>
        </div>

        <div class="profile-info">
          <h4 class="profile-name">{{ user.username || 'Usuario' }}</h4>
          <p class="profile-email">{{ user.email }}</p>
        </div>

        <div class="profile-meta">
          <span class="meta-badge">Rol: {{ user.role }}</span>
        </div>

        <div class="profile-details">
          @if (user.createdAt) {
            <div class="profile-detail-row">
              <span class="detail-label">Creado:</span>
              <span>{{ user.createdAt | date:'medium' }}</span>
            </div>
          }
          @if (user.updatedAt) {
            <div class="profile-detail-row">
              <span class="detail-label">Última actualización:</span>
              <span>{{ user.updatedAt | date:'medium' }}</span>
            </div>
          }
        </div>
      </div>
    } @else {
      <div class="profile-loading">
        <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
        <span>Cargando perfil...</span>
      </div>
    }
  `,
  styles: [`
    .profile-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 2rem;
      color: var(--color-text-muted, #7F8C8D);
    }

    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
    }

    .avatar-wrapper {
      position: relative;
    }

    .avatar-placeholder {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-accent, #1ABC9C), var(--color-secondary, #3498DB));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
      box-shadow: 0 4px 15px rgba(26, 188, 156, 0.3);
    }

    .avatar-status-dot {
      position: absolute;
      bottom: 4px;
      right: 4px;
      width: 16px;
      height: 16px;
      background: var(--color-success, #27AE60);
      border-radius: 50%;
      border: 3px solid var(--color-bg-card, #fff);
      box-shadow: 0 2px 6px rgba(39, 174, 96, 0.4);
    }

    .profile-info {
      text-align: center;
    }

    .profile-name {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--color-primary, #2C3E50);
      margin: 0 0 0.25rem;
    }

    .profile-email {
      font-size: 0.95rem;
      color: var(--color-text-muted, #7F8C8D);
      margin: 0;
    }

    .profile-meta {
      margin-top: 0.5rem;
    }

    .meta-badge {
      font-size: 0.85rem;
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
      font-weight: 500;
    }

    .profile-details {
      width: 100%;
      margin-top: 1rem;
    }

    .profile-detail-row {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      border-top: 1px solid #e9ecef;
      padding: 0.75rem 0;
      font-size: 0.95rem;
      color: #495057;
    }

    .detail-label {
      color: #6c757d;
    }
  `]
})
export class ProfileComponent {
  protected authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly user$ = this.authService.user$;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
