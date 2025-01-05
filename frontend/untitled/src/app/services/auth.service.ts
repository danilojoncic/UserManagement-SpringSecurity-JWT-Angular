import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PermissionType } from "../models/permissionType";
import {LoginAttempt} from "../models/login-attempt";
import {LoginResponse} from "../models/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeJwt(token);
      this.currentUserSubject.next(decodedToken);
    }
  }

  login(credentials: LoginAttempt): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.jwt);
        const decodedToken = this.decodeJwt(response.jwt);
        this.currentUserSubject.next(decodedToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  decodeJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return null;
    }
  }

  hasPermission(permission: string): boolean {
    const currentUser = this.currentUserSubject.value;
    console.log(currentUser);

    if (!currentUser || !currentUser.permissions) return false;

    return currentUser.permissions.includes(permission);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
