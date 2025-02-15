import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { BedService } from '../../services/bed.service';
import { PatientService } from '../../services/patient.service';
import { HospitalizationService } from '../../services/hospitalization.service';
import { Patient } from '../../model/patient.model'; 
import { Bed } from '../../model/bed.model'; 

@Component({
  selector: 'app-assign-bed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-bed.component.html',
  styleUrls: ['./assign-bed.component.css']
})
export class AssignBedComponent implements OnInit {
  pacientes: Patient[] = [];
  camasDisponibles: Bed[] = [];
  selectedPatient: number | null = null;
  selectedBed: Bed | null = null;
  motivoIngreso: string = '';
  fechaIngreso: string = '';
  motivoIngresoOptions: string[] = ["Urgencia Cardiaca", "Urgencia Respiratoria", "Cirugía"];
  selectedSala: string = 'Sala 1'; 
  mensaje: string = '';

  constructor(
    private patientService: PatientService,
    private bedService: BedService,
    private hospitalizationService: HospitalizationService
  ) {}

  ngOnInit(): void {
    this.obtenerPacientes();
    this.obtenerCamasDisponibles();
  }

  obtenerPacientes() {
    this.patientService.getAllPatients().subscribe(
      (data: Patient[]) => {
        this.pacientes = data;
      },
      (error) => {
        console.error("❌ Error al obtener pacientes:", error);
        this.mensaje = '❌ No se pudieron cargar los pacientes.';
      }
    );
  }

  obtenerCamasDisponibles() {
    this.bedService.getAvailableBeds().subscribe(
      (data: Bed[]) => {
        console.log('🛏️ Camas obtenidas:', data);

        this.camasDisponibles = data.map((bed) => ({
          id: bed.id,
          ocupada: bed.ocupada === true // Asegurar que ocupada sea un booleano
        })).sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.error("❌ Error al obtener camas disponibles:", error);
        this.mensaje = '❌ No se pudieron cargar las camas disponibles.';
      }
    );
  }

  seleccionarCama(bed: Bed) {
    if (!bed.ocupada) {
      this.selectedBed = bed;
      console.log(`✅ Cama seleccionada: ID ${bed.id}`);
    } else {
      console.warn(`⚠️ La cama ID ${bed.id} ya está ocupada.`);
    }
  }

  asignarCama() {
    if (!this.selectedPatient || !this.selectedBed || !this.motivoIngreso || !this.fechaIngreso) {
      this.mensaje = '⚠️ Complete todos los campos.';
      console.error("❌ Error: Faltan datos", {
        selectedPatient: this.selectedPatient,
        selectedBed: this.selectedBed,
        motivoIngreso: this.motivoIngreso,
        fechaIngreso: this.fechaIngreso
      });
      return;
    }

    // Convertir la fecha al formato esperado (YYYY-MM-DD)
    //const formattedFechaIngreso = this.formatDate(this.fechaIngreso);

    // Crear el objeto hospitalización que se enviará al backend
    const hospitalizacionData = {
      paciente: Number(this.selectedPatient),  // Enviar solo el ID
      cama: this.selectedBed.id,  // Enviar solo el ID
      motivoIngreso: this.motivoIngreso,
      fechaIngreso: this.fechaIngreso,
      sala: this.selectedSala
  };
  

    console.log("📢 JSON enviado al backend:", JSON.stringify(hospitalizacionData, null, 2));

    // ✅ 1. Asignar la cama en la API de camas (usando el orden correcto de IDs)
    this.bedService.assignBed(this.selectedBed.id, this.selectedPatient).subscribe(
      (response: any) => {  
        console.log("✅ Respuesta de la API de camas:", response);
        this.mensaje = response?.message || '✅ Cama asignada correctamente.';

        // ✅ 2. Guardar la hospitalización en el backend
        this.hospitalizationService.createHospitalization(hospitalizacionData).subscribe(
          (response) => {
            this.mensaje = '✅ Cama asignada con éxito.';
            console.log("✅ Respuesta del backend:", response);

            // ✅ 3. Actualizar la lista de camas disponibles y limpiar el formulario
            this.obtenerCamasDisponibles();
            this.resetForm();
          },
          (error) => {
            this.mensaje = '❌ Error al asignar la hospitalización.';
            console.error("❌ Error del backend:", error);
          }
        );
      },
      (error) => {
        this.mensaje = '❌ Error al asignar la cama en la API de camas.';
        console.error("❌ Error del backend (API de camas):", error);
      }
    );
  }

  resetForm() {
    this.selectedPatient = null;
    this.selectedBed = null;
    this.motivoIngreso = '';
    this.fechaIngreso = '';
  }

  
}
