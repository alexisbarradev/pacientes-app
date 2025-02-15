import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bed } from '../model/bed.model'; // ✅ Importación correcta del modelo `Bed`

@Injectable({
  providedIn: 'root'
})
export class BedService {
  private apiUrl = 'http://localhost:8080/api/camas'; // URL del backend

  constructor(private http: HttpClient) {}

  // ✅ Corrección: Retornar un Observable<Bed[]> en lugar de string[]
  getAvailableBeds(): Observable<Bed[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disponibles`).pipe(
      map((beds: any[]) => {
        console.log('Respuesta de camas disponibles:', beds); // Agregado para loguear la respuesta de la API
        return beds.map(bed => ({
          id: bed.id,
          ocupada: bed.ocupada === true || bed.ocupada === "true" || bed.ocupada === 1
        }));
      })
    );
  }
  
  // Método para asignar cama
  assignBed(bedId: number, patientId: number): Observable<any> {
    console.log(`Asignando cama con ID: ${bedId} al paciente con ID: ${patientId}`); // Log para saber qué cama y paciente se están asignando
    return this.http.put(`${this.apiUrl}/asignar/${bedId}/${patientId}`, null).pipe(
      // Agregar un log para mostrar la respuesta de la asignación
      map(response => {
        console.log('Respuesta al asignar cama:', response); // Log de la respuesta al asignar cama
        return response;
      })
    );
  }
}

