import { Routes } from '@angular/router';
import { PatientListComponent } from './pacientes/patient-list/patient-list.component';
import { EnterPatientComponent } from './pacientes/enter-patient/enter-patient.component';
import { AssignBedComponent } from './pacientes/assign-bed/assign-bed.component';
import { AssignBedDetailComponent } from './pacientes/assign-bed/assign-bed-detail/assign-bed-detail.component';
import { HospitalizationListComponent } from './components/hospitalization-list/hospitalization-list.component'; // ✅ Importa el nuevo componente


export const routes: Routes = [
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' },
  { path: 'pacientes', component: PatientListComponent },
  { path: 'registrar', component: EnterPatientComponent },
  { path: 'registrar/:id', component: EnterPatientComponent }, // ✅ Ruta con parámetro ID

  // ✅ Nuevas rutas para asignar cama
  { path: 'asignar-cama', component: AssignBedComponent }, 
  { path: 'asignar-cama/detalle/:id', component: AssignBedDetailComponent }, // Con parámetro ID

  // ✅ Ruta para visualizar la lista de hospitalizaciones
  { path: 'hospitalizaciones', component: HospitalizationListComponent },


  { path: '**', redirectTo: 'pacientes' }
];
