import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HousingService } from '../services/housing';
import { Kos } from './housing.model'; // sesuaikan path model

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  kosList: Kos[] = [];
  filteredKos: Kos[] = [];
  searchQuery: string = '';
  selectedCity: string = 'all';
  isLoading: boolean = false;
  errorMessage: string = '';

  cities = ['Semua Lokasi', 'Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya'];

  private fallbackData: Kos[] = [
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

  constructor(private housingService: HousingService) {}

  ngOnInit(): void {
    // Set default dengan fallback data
    this.kosList = this.fallbackData;
    this.filteredKos = this.fallbackData;
    this.loadKos();
  }

  loadKos() {
    // Hanya tampilkan loading jika belum ada data
    if (this.kosList.length === 0) {
      this.isLoading = true;
    }
    this.errorMessage = '';

    this.housingService.getAllHousing().subscribe({
      next: (data: any[]) => {
        console.log('RAW API RESPONSE:', data);
        // toleransi terhadap bentuk respons yang berbeda
        let list: any[] = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data && Array.isArray((data as any).data)) {
          list = (data as any).data;
        } else if (data && Array.isArray((data as any).housing)) {
          list = (data as any).housing;
        }

        this.kosList = list.map((item) => ({
          id: item.id ?? item._id ?? null,
          nama: item.nama ?? item.title ?? 'Kos Tanpa Nama',
          lokasi: item.lokasi ?? item.location ?? '-',
          harga: item.harga ?? (item.price ? `Rp ${item.price}` : '-'),
          rating: item.rating ?? 0,
          label: item.label ?? item.type ?? 'Kos',
          image: item.image ?? 'https://via.placeholder.com/400x250',
        }));

        this.filteredKos = [...this.kosList];
        this.isLoading = false;
        console.log('Parsed kosList length:', this.kosList.length);
      },
      error: (err) => {
        console.error('API ERROR:', err);
        this.kosList = this.fallbackData;
        this.filteredKos = this.fallbackData;
        this.isLoading = false;
        this.errorMessage = 'Menggunakan data demo';
      },
    });
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.filteredKos = [...this.kosList];
      return;
    }

    this.filteredKos = this.kosList.filter(
      (kos) =>
        kos.nama.toLowerCase().includes(query) ||
        kos.lokasi.toLowerCase().includes(query) ||
        kos.label.toLowerCase().includes(query)
    );
  }

  filterByCity(city: string) {
    if (city === 'Semua Lokasi') {
      this.selectedCity = 'all';
      this.filteredKos = [...this.kosList];
      return;
    }

    this.selectedCity = city;
    this.filteredKos = this.kosList.filter((kos) =>
      kos.lokasi.toLowerCase().includes(city.toLowerCase())
    );

    // tetap respect search
    if (this.searchQuery) {
      this.onSearch();
    }
  }
}
