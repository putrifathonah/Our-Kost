import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface Kos {
  id: number;
  nama: string;
  lokasi: string;
  harga: string;
  rating: number;
  label: string;
  image: string;
}

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit {
  kos: Kos | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  kosId: number = 0;

  // Data kos - sama seperti di Home Component
  kosPopuler: Kos[] = [
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Ambil ID dari route parameter
    this.route.params.subscribe((params) => {
      this.kosId = +params['id']; // + untuk convert string ke number
      this.loadKosDetail();
    });
  }

  loadKosDetail(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Cari data berdasarkan ID - langsung tanpa delay
    const foundKos = this.kosPopuler.find((k) => k.id === this.kosId);
    if (foundKos) {
      this.kos = foundKos;
      this.isLoading = false;
      console.log('Detail kos berhasil dimuat:', foundKos);
    } else {
      this.errorMessage = 'Kos tidak ditemukan.';
      this.isLoading = false;
      console.error('Kos dengan ID', this.kosId, 'tidak ditemukan');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
