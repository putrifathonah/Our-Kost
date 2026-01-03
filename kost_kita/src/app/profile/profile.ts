import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  alamat: string;
  kotaAsal: string;
  noKTP: string;
  tanggalLahir: string;
  jenisKelamin: string;
  pekerjaan: string;
  avatar: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  isEditing = false;
  userProfile: UserProfile = {
    id: '',
    name: '',
    email: '',
    phone: '',
    alamat: '',
    kotaAsal: '',
    noKTP: '',
    tanggalLahir: '',
    jenisKelamin: '',
    pekerjaan: '',
    avatar: 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg',
  };

  editProfile: UserProfile = { ...this.userProfile };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userData = this.authService.getUserData();
    console.log('User Data from localStorage:', userData);
    if (userData) {
      this.userProfile = {
        id: userData.id || '',
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        alamat: '',
        kotaAsal: '',
        noKTP: '',
        tanggalLahir: '',
        jenisKelamin: '',
        pekerjaan: '',
        avatar: 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg',
      };
      console.log('Profile after loading:', this.userProfile);
      this.editProfile = { ...this.userProfile };
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editProfile = { ...this.userProfile };
    }
  }

  saveProfile() {
    this.userProfile = { ...this.editProfile };
    this.isEditing = false;
  }

  cancelEdit() {
    this.editProfile = { ...this.userProfile };
    this.isEditing = false;
  }

  logout() {
    // Hapus session/token dari localStorage jika ada
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.clear();

    // Navigate ke login page
    this.router.navigate(['/login']);

    console.log('User telah logout');
  }
}
