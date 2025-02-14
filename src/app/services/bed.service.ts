import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BedService {
  private apiUrl = 'http://localhost:8080/api/camas'; // URL del backend

  constructor(private http: HttpClient) {}

  // ✅ Corrección: Retornamos un Observable<string[]>
  getAvailableBeds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/disponibles`);
  }

  // Método para asignar una cama a un paciente
  assignBed(patientId: number, bedId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/asignar/${bedId}/${patientId}`, {}); 
  }
}

