import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService, BusinessService, RegionService } from '../../services/api';
import { IUser } from '../../models/user.model';
import { IBusiness, BusinessType } from '../../models/business.model';
import { IRegion } from '../../models/region.model';

@Component({
  selector: 'app-user-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-section.html',
  styleUrl: './user-section.css',
})
export class UserSection implements OnInit {
  private readonly userService = inject(UserService);
  private readonly businessService = inject(BusinessService);
  private readonly regionService = inject(RegionService);
  readonly auth = inject(AuthService);

  readonly user$ = this.auth.user$;

  /** Current user matched from backend */
  readonly currentUser = signal<IUser | null>(null);
  readonly userBusinesses = signal<IBusiness[]>([]);
  readonly regions = signal<IRegion[]>([]);
  readonly isLoading = signal(true);
  readonly userNotFound = signal(false);
  readonly businessTypes = Object.values(BusinessType);

  /** UI States */
  readonly showRegisterForm = signal(false);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');

  /** New business form */
  readonly newBusiness = signal<Partial<IBusiness>>({
    businessName: '',
    email: '',
    initialInvestment: 0,
    annualIncome: 0,
    type: BusinessType.OTHER,
  });
  readonly selectedRegionId = signal<number | null>(null);

  /** User initials for avatar */
  readonly userInitials = computed(() => {
    const name = this.currentUser()?.username ?? '';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  ngOnInit(): void {
    this.loadInitialData();
  }

  toggleRegisterForm(): void {
    this.showRegisterForm.set(!this.showRegisterForm());
    this.clearMessages();
  }

  registerBusiness(): void {
    const user = this.currentUser();
    const regionId = this.selectedRegionId();
    const data = this.newBusiness();

    if (!user || !data.businessName || !data.email || !regionId) {
      this.errorMessage.set('Por favor completa todos los campos obligatorios.');
      return;
    }

    const payload: Record<string, unknown> = {
      ...data,
      region: { id: regionId },
    };

    this.businessService.createForUser(user.id, payload as Partial<IBusiness>).subscribe({
      next: () => {
        this.successMessage.set('Emprendimiento registrado exitosamente.');
        this.errorMessage.set('');
        this.resetForm();
        this.showRegisterForm.set(false);
        this.loadUserBusinesses(user.id);
      },
      error: () => {
        this.errorMessage.set('Error al registrar el emprendimiento.');
      },
    });
  }

  deleteBusiness(businessId: number): void {
    const user = this.currentUser();
    if (!user) return;

    this.businessService.delete(businessId).subscribe({
      next: () => {
        this.successMessage.set('Emprendimiento eliminado.');
        this.loadUserBusinesses(user.id);
      },
      error: () => {
        this.errorMessage.set('Error al eliminar el emprendimiento.');
      },
    });
  }

  updateFormField(field: string, value: string | number): void {
    this.newBusiness.update((prev) => ({ ...prev, [field]: value }));
  }

  private loadInitialData(): void {
    this.regionService.getAll().subscribe({
      next: (regions) => this.regions.set(regions),
    });

    this.auth.user$.subscribe((user) => {
      if (!user?.email) {
        this.isLoading.set(false);
        return;
      }

      this.userService.getAll().subscribe({
        next: (users) => {
          const matched = users.find(
            (u) => u.email.toLowerCase() === user.email.toLowerCase()
          );
          if (matched) {
            this.currentUser.set(matched);
            this.loadUserBusinesses(matched.id);
            this.userNotFound.set(false);
          } else {
            this.userNotFound.set(true);
          }
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
    });
  }

  private loadUserBusinesses(userId: number): void {
    this.businessService.getAll().subscribe({
      next: (all) => {
        const filtered = all.filter((b) => b.user?.id === userId);
        this.userBusinesses.set(filtered);
      },
    });
  }

  private resetForm(): void {
    this.newBusiness.set({
      businessName: '',
      email: '',
      initialInvestment: 0,
      annualIncome: 0,
      type: BusinessType.OTHER,
    });
    this.selectedRegionId.set(null);
  }

  private clearMessages(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
  }
}
