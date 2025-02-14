import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BedService } from '../../services/bed.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-assign-bed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-bed.component.html',
  styleUrls: ['./assign-bed.component.css']
})
export class AssignBedComponent implements OnInit {
  pacientes: any[] = [];
  camasDisponibles: string[] = []; // ✅ Ahora es un array de strings
  selectedPatient: number | null = null;
  selectedBed: string | null = null; // ✅ Cambia a `string` en lugar de `number`
  mensaje: string = '';

  constructor(
    private patientService: PatientService,
    private bedService: BedService
  ) {}

  ngOnInit(): void {
    this.obtenerPacientes();
    this.obtenerCamasDisponibles();
  }

  obtenerPacientes() {
    this.patientService.getAllPatients().subscribe((data) => {
      this.pacientes = data;
    });
  }

  obtenerCamasDisponibles() {
    this.bedService.getAvailableBeds().subscribe((data: string[]) => {
      this.camasDisponibles = data;
    });
  }

  asignarCama() {
    if (this.selectedPatient && this.selectedBed) {
      // 🔥 Convertimos el string de la cama en ID extrayendo el número
      const bedId = parseInt(this.selectedBed.split(' ')[1]); 

      this.bedService.assignBed(this.selectedPatient, bedId).subscribe(() => {
        this.mensaje = 'Cama asignada con éxito.';
        this.obtenerCamasDisponibles(); // Refrescar camas disponibles
      });
    }
  }
}
