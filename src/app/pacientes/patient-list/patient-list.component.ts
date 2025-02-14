import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient.model';
import { Router } from '@angular/router';  // ✅ Importa el router

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService, private router: Router) {} // ✅ Agrega Router

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  deletePatient(id: number): void {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      this.patientService.deletePatient(id).subscribe(() => {
        this.loadPatients();
      });
    }
  }

  editPatient(id: number): void {
    this.router.navigate(['/registrar', id]); // ✅ Redirige a la página de edición
  }
}
