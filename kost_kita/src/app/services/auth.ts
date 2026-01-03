import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    token?: string;
    createdAt?: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  getProfile(userId: string): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/profile/${userId}`);
  }

  saveUserData(userData: any): void {
    // Simpan token jika ada
    if (userData.token) {
      localStorage.setItem('authToken', userData.token);
    }
    // Simpan user data
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getUserData() !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
