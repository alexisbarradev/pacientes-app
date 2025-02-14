import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Agregado
import { FormsModule } from '@angular/forms'; // ✅ Agregado
import { BedService } from '../../services/bed.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-assign-bed',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Agregado aquí
  templateUrl: './assign-bed.component.html',
  styleUrls: ['./assign-bed.component.css']
})
export class AssignBedComponent implements OnInit {
  pacientes: any[] = [];
  camasDisponibles: any[] = [];
  bedRows: any[][] = []; // Matriz de camas organizadas
  selectedPatient: number | null = null;
  selectedBed: any | null = null;
  mensaje: string = '';

  rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; // Etiquetas para las filas

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
    this.bedService.getAvailableBeds().subscribe((data) => {
      this.camasDisponibles = data;
      this.organizarCamas();
    });
  }

  organizarCamas() {
    const columnas = 10; // Número de camas por fila
    this.bedRows = [];

    for (let i = 0; i < this.camasDisponibles.length; i += columnas) {
      this.bedRows.push(this.camasDisponibles.slice(i, i + columnas));
    }
  }

  seleccionarCama(bed: any) {
    if (!bed.ocupada) {
      this.selectedBed = bed;
    }
  }

  asignarCama() {
    if (this.selectedPatient && this.selectedBed) {
      this.bedService.assignBed(this.selectedPatient, this.selectedBed.id).subscribe(() => {
        this.mensaje = 'Cama asignada con éxito.';
        this.obtenerCamasDisponibles();
      });
    }
  }
}
