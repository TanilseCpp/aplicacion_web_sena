import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { IUser, ILoginRequest } from '../models/user.model';

const API_BASE = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly url = `${API_BASE}/users`;

  // Estados reactivos
  readonly isLoggedIn = signal(this.checkLoggedIn());
  readonly currentUser = signal<IUser | null>(this.getUserFromStorage());
  
  private userSubject = new BehaviorSubject<IUser | null>(this.getUserFromStorage());
  public user$ = this.userSubject.asObservable();

  constructor() {
    this.initializeAuthState();
  }

  /**
   * Registra un nuevo usuario
   */
  register(user: Omit<IUser, 'id'>): Observable<IUser> {
    // Quitamos el "/register" para que pegue directamente a http://localhost:8080/api/users
    return this.http.post<IUser>(this.url, user); 
  }

  /**
   * Inicia sesión con credenciales de usuario
   */
  login(credentials: ILoginRequest): Observable<IUser | any> {
    // Intenta manejar distintos formatos de respuesta del backend.
    return this.http.post<any>(`${this.url}/login`, credentials).pipe(
      tap((response: any) => {
        const rawString = typeof response === 'string' ? response : null;
        const responseUser = response?.user ?? (typeof response === 'object' ? response : null);

        if (responseUser && responseUser.id && responseUser.username) {
          this.setAuthenticatedUser(responseUser as IUser);
          return;
        }

        const tokenCandidate = response?.token ?? rawString;
        const token = typeof tokenCandidate === 'string' && tokenCandidate.split('.').length === 3 ? tokenCandidate : null;

        if (token) {
          localStorage.setItem('authToken', token);
          this.isLoggedIn.set(true);
          localStorage.setItem('isLoggedIn', 'true');
          this.loadCurrentUser(token);
          return;
        }

        if (rawString && rawString.toLowerCase().includes('login')) {
          this.isLoggedIn.set(true);
          localStorage.setItem('isLoggedIn', 'true');
          this.http.get<IUser[]>(`${this.url}`).subscribe({
            next: (users) => {
              const found = users.find(u => u.username === credentials.username);
              if (found) {
                this.setAuthenticatedUser(found);
              }
            },
            error: () => {
              // no hacemos nada si falla la obtención; el login sigue considerado exitoso
            }
          });
        }
      })
    );
  }

  private setAuthenticatedUser(user: IUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    this.currentUser.set(user);
    this.userSubject.next(user);
    this.isLoggedIn.set(true);
  }

  /**
   * Cierra sesión del usuario
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.userSubject.next(null);
    
    this.router.navigate(['/']);
  }

  /**
   * Obtiene el token del localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true' && !!this.getToken();
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): IUser | null {
    return this.currentUser();
  }

  /**
   * Carga el usuario actual desde el servidor
   */
  private loadCurrentUser(token?: string): void {
    const t = token ?? this.getToken();
    if (!t) return;

    // Llamada protegida para obtener el perfil del usuario actual
    const headers = { Authorization: `Bearer ${t}` };
    this.http.get<IUser>(`${this.url}/me`, { headers }).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      },
      error: () => {
        // si falla, no bloqueamos el login; el usuario puede no existir o el endpoint no esté disponible
      },
    });
  }

  /**
   * Obtiene el usuario del localStorage
   */
  private getUserFromStorage(): IUser | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Verifica el estado de login al inicializar
   */
  private checkLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  /**
   * Inicializa el estado de autenticación
   */
  private initializeAuthState(): void {
    const isLogged = this.checkLoggedIn();
    const user = this.getUserFromStorage();
    
    this.isLoggedIn.set(isLogged);
    this.currentUser.set(user);
    this.userSubject.next(user);
  }
}
