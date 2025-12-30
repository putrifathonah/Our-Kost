import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Mohon lengkapi semua field';
      return;
    }

    this.successMessage = 'Login berhasil (simulasi frontend)';

    const user = {
      id: 'local-1',
      name: 'Pengguna Demo',
      email: this.loginForm.value.email,
    };

    this.authService.saveUserData(user);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigateByUrl(returnUrl);
  }

  //   submitLogin(): void {
  //     if (this.loginForm.invalid) {
  //       this.errorMessage = 'Mohon lengkapi semua field dengan benar';
  //       return;
  //     }

  //     this.isLoading = true;
  //     this.errorMessage = '';
  //     this.successMessage = '';

  //     const loginData = this.loginForm.value;

  //     this.authService.login(loginData).subscribe({
  //       next: (response) => {
  //         this.isLoading = false;
  //         this.successMessage = response.message || 'Login berhasil';

  //         if (response.data) {
  //           this.authService.saveUserData(response.data);
  //         }

  //         setTimeout(() => {
  //           this.router.navigate(['/']);
  //         }, 1000);
  //       },
  //       error: (error) => {
  //         this.isLoading = false;
  //         this.errorMessage = error.error?.message || 'Email atau password salah';

  //         setTimeout(() => {
  //           this.errorMessage = '';
  //         }, 5000);
  //       },
  //     });
  //   }
}
