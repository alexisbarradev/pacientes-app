import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalizationService {
  private apiUrl = 'http://localhost:8080/api/hospitalizaciones'; // URL del backend

  constructor(private http: HttpClient) {}

  // ✅ Método para crear una nueva hospitalización
  createHospitalization(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // ✅ Método para obtener todas las hospitalizaciones
  getHospitalizations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // ✅ Método para obtener hospitalizaciones de un paciente específico
  getHospitalizationsByPatient(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paciente/${patientId}`);
  }

  // ✅ Método para actualizar una hospitalización (por ejemplo, dar de alta)
  updateHospitalization(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // ✅ Método para eliminar una hospitalización
  deleteHospitalization(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
