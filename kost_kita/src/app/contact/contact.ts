import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
  contactForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private contactService: ContactService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const formData = this.contactForm.value;

      this.contactService.submitContact(formData).subscribe(
        (response) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = response.message;
            console.log('Pesan berhasil dikirim:', response.data);
            this.contactForm.reset();

            // Hilangkan notifikasi setelah 3 detik
            setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          } else {
            this.errorMessage = response.message || 'Terjadi kesalahan saat mengirim pesan';
          }
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Terjadi kesalahan saat mengirim pesan';
          console.error('Error:', error);
        }
      );
    } else {
      alert('Harap isi semua kolom dengan benar sebelum mengirim pesan.');
    }
  }
}

