import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface UserProfile {
  id: number;
  nama: string;
  email: string;
  noTelepon: string;
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
export class Profile {
  isEditing = false;
  userProfile: UserProfile = {
    id: 1,
    nama: 'Rei',
    email: 'reigtg@email.com',
    noTelepon: '+62 812-3456-7890',
    alamat: 'Jl. Rajawali No. 12, Surabaya',
    kotaAsal: 'Surabaya',
    noKTP: '3271234567890123',
    tanggalLahir: '2003-05-15',
    jenisKelamin: 'Laki-laki',
    pekerjaan: 'Mahasiswa',
    avatar: 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg',
  };

  editProfile: UserProfile = { ...this.userProfile };

  constructor(private router: Router) {}

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
