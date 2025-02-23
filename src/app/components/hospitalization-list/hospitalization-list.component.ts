import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalizationListService } from '../../services/hospitalization-list.service';
 // ✅ Importamos HttpClient para realizar peticiones al backend : RabbitMQ
import { HttpClient } from '@angular/common/http';
//
import { RouterModule, Router } from '@angular/router';



@Component({
  selector: 'app-hospitalization-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Usa RouterModule en lugar de Router
  templateUrl: './hospitalization-list.component.html',
  styleUrls: ['./hospitalization-list.component.css']
})
export class HospitalizationListComponent implements OnInit {
  hospitalizations: any[] = [];// Lista de hospitalizaciones
  mensaje: string = ''; // Mensaje de error o confirmación
  // ⚡ Variable para almacenar el intervalo que genera las alertas:Rabbit MQ
  private intervalId: any; 


  constructor(
    private hospitalizationService: HospitalizationListService,
    private http: HttpClient, // ✅ Inyectamos HttpClient para las solicitudes RABBIT MQ
    private router: Router     // ✅ Inyecta el Router aquí
  ) {}

  ngOnInit(): void {
    this.loadHospitalizations();// Cargamos las hospitalizaciones al iniciar el componente
  }

  loadHospitalizations() {
    this.hospitalizationService.getHospitalizations().subscribe(
      (data) => {
        this.hospitalizations = data;
      },
      (error) => {
        console.error('❌ Error al obtener hospitalizaciones:', error);
        this.mensaje = 'No se pudieron cargar las hospitalizaciones.';
      }
    );
  }
  //:::::::::::::::::::::::::::::::R A B B I T  M Q:::::::::::::::::::::::::::::::::::::
  // 🚨 Iniciar las alertas respiratorias al hacer clic en el botón "Frecuencia"
  //startFrequency(patientId: string) {
  //  console.log(`🚨 Iniciando alertas respiratorias para el paciente: ${patientId}`);

    // 🛑 Si ya hay un intervalo activo, lo detenemos antes de iniciar uno nuevo
  //  if (this.intervalId) {
  //    clearInterval(this.intervalId);
  //  }

    // 🔄 Iniciamos el intervalo para enviar alertas cada 2 segundos
  //  this.intervalId = setInterval(() => {
  //    this.http.post('http://localhost:8080/api/patients/start-respiratory-alerts', null, {
  //      params: { patientId: patientId } // ✅ Enviamos el ID del paciente al backend
  //    }).subscribe({
  //      next: (response) => console.log(`✅ Alerta enviada para el paciente ${patientId}`, response),
  //      error: (error) => console.error('❌ Error al enviar la alerta', error)
  //    });
  //  }, 2000); // Cada 2 segundos
  //}

  startFrequency(patientId: string) {
    console.log(`🚨 Iniciando alertas respiratorias para el paciente: ${patientId}`);
  
    // 🛑 Si ya hay un intervalo activo, lo detenemos antes de iniciar uno nuevo
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  
    // 🔄 Iniciamos el intervalo para enviar alertas cada 2 segundos
    this.intervalId = setInterval(() => {
      this.http.post('http://localhost:8080/api/patients/start-respiratory-alerts', null, {
        params: { patientId: patientId } // ✅ Enviamos el ID del paciente al backend
      }).subscribe({
        next: (response) => console.log(`✅ Alerta enviada para el paciente ${patientId}`, response),
        error: (error) => console.error('❌ Error al enviar la alerta', error)
      });
    }, 2000); // Cada 2 segundos
  
    // 🎯 Redirigir al usuario a la página de la frecuencia
    this.router.navigate(['/frecuencia', patientId]);
  }
  

  // 🛑 Detener las alertas respiratorias (opcional)
  stopFrequency() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('🛑 Frecuencia detenida');
    }
  }


 

  //el end point de aqui hace lo siguiente:
  //Envía una solicitud POST al backend.
  //Incluye el ID del paciente como parámetro.
  //El backend recibe el ID y lo usa para iniciar el monitoreo o las alertas respiratorias.
  //Esto se repite cada 2 segundos por el setInterval.

}
