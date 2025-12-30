import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    if (
      this.contactData.name &&
      this.contactData.email &&
      this.contactData.subject &&
      this.contactData.message
    ) {
      console.log('Pesan berhasil dikirim:', this.contactData);
      alert('Pesan Anda telah berhasil dikirim!');
      this.resetForm();
    } else {
      alert('Harap isi semua kolom sebelum mengirim pesan.');
    }
  }

  resetForm() {
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
