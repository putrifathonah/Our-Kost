import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/contacts';

  constructor(private http: HttpClient) {}

  // Mengirim pesan contact
  submitContact(contactData: ContactData): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactData);
  }

  // Mengambil semua pesan (untuk admin)
  getAllContacts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Mengambil pesan berdasarkan ID
  getContactById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update status pesan
  updateContactStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { status });
  }

  // Hapus pesan
  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
