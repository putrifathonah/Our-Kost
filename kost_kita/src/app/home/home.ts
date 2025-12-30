import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  kosPopuler = [
    {
      id: 1,
      nama: 'Kos Nyaman Dekat UI Depok',
      lokasi: 'Beji, Depok',
      harga: 'Rp 1.500.000 / bulan',
      rating: 4.8,
      label: 'Kos Putri',
      image: 'https://images.pexels.com/photos/6588581/pexels-photo-6588581.jpeg',
    },
    {
      id: 2,
      nama: 'Kos Eksklusif Area Kuningan',
      lokasi: 'Kuningan, Jakarta Selatan',
      harga: 'Rp 3.200.000 / bulan',
      rating: 4.9,
      label: 'Kos Putra',
      image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
    },
    {
      id: 3,
      nama: 'Kos Strategis Dekat UGM',
      lokasi: 'Sleman, Yogyakarta',
      harga: 'Rp 1.200.000 / bulan',
      rating: 4.7,
      label: 'Kos Putra',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    },
    {
      id: 4,
      nama: 'Kos Modern Area Dago',
      lokasi: 'Dago, Bandung',
      harga: 'Rp 2.000.000 / bulan',
      rating: 4.8,
      label: 'Kos Putri',
      image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg',
    },
    {
      id: 5,
      nama: 'Kos Minimalis Dekat ITS',
      lokasi: 'Sukolilo, Surabaya',
      harga: 'Rp 1.100.000 / bulan',
      rating: 4.6,
      label: 'Kos Putra',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    },
    {
      id: 6,
      nama: 'Kos Premium BSD City',
      lokasi: 'BSD, Tangerang Selatan',
      harga: 'Rp 2.500.000 / bulan',
      rating: 4.9,
      label: 'Kos Putri',
      image: 'https://images.pexels.com/photos/7031711/pexels-photo-7031711.jpeg',
    },
    {
      id: 7,
      nama: 'Kos Minimalis Area Tebet',
      lokasi: 'Tebet, Jakarta Selatan',
      harga: 'Rp 1.800.000 / bulan',
      rating: 4.7,
      label: 'Kos Putri',
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
    },
    {
      id: 8,
      nama: 'Kos Nyaman Dekat UNAIR',
      lokasi: 'Gubeng, Surabaya',
      harga: 'Rp 1.300.000 / bulan',
      rating: 4.6,
      label: 'Kos Putri',
      image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
    },
    {
      id: 9,
      nama: 'Kos Modern Area Setiabudi',
      lokasi: 'Setiabudi, Bandung',
      harga: 'Rp 2.200.000 / bulan',
      rating: 4.8,
      label: 'Kos Putra',
      image: 'https://images.pexels.com/photos/90319/pexels-photo-90319.jpeg',
    },
  ];

  searchQuery: string = '';
  filteredKos: any[] = [...this.kosPopuler];
  selectedCity: string = '';
  cities = ['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya'];

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredKos = this.kosPopuler.filter(
      (kos) =>
        kos.nama.toLowerCase().includes(query) ||
        kos.lokasi.toLowerCase().includes(query) ||
        kos.label.toLowerCase().includes(query)
    );
  }

  filterByCity(city: string) {
    if (this.selectedCity === city) {
      // Jika kota yang sama diklik, tampilkan semua kos
      this.selectedCity = '';
      this.filteredKos = [...this.kosPopuler];
    } else {
      // Filter kos berdasarkan kota yang dipilih
      this.selectedCity = city;
      this.filteredKos = this.kosPopuler.filter((kos) =>
        kos.lokasi.toLowerCase().includes(city.toLowerCase())
      );
    }
  }
}
