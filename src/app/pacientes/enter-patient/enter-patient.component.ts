import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-enter-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enter-patient.component.html',
  styleUrls: ['./enter-patient.component.css']
})
export class EnterPatientComponent implements OnInit {
  patientForm!: FormGroup;
  patientId: number | null = null;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      rut: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: [''],
      comuna: [''],
      region: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.patientId = +id;
        this.isEditing = true;
        this.loadPatientData(this.patientId);
      }
    });
  }

  loadPatientData(id: number): void {
    this.patientService.getPatientById(id).subscribe(patient => {
      if (patient) {
        this.patientForm.patchValue(patient);
      }
    }, error => {
      console.error('Error al cargar los datos del paciente', error);
    });
  }

  savePatient(): void {
    if (this.patientForm.valid) {
      const patientData = this.patientForm.value;

      if (this.isEditing && this.patientId) {
        // ✅ Editar paciente existente
        this.patientService.updatePatient(this.patientId, patientData).subscribe(response => {
          console.log('Paciente actualizado correctamente', response);
          this.router.navigate(['/pacientes']);
        }, error => {
          console.error('Error al actualizar el paciente', error);
        });
      } else {
        // ✅ Guardar nuevo paciente
        this.patientService.createPatient(patientData).subscribe(response => {
          console.log('Paciente creado correctamente', response);
          this.router.navigate(['/pacientes']);
        }, error => {
          console.error('Error al crear el paciente', error);
        });
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}
