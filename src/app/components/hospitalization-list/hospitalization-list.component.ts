import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalizationListService } from '../../services/hospitalization-list.service';

@Component({
  selector: 'app-hospitalization-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hospitalization-list.component.html',
  styleUrls: ['./hospitalization-list.component.css']
})
export class HospitalizationListComponent implements OnInit {
  hospitalizations: any[] = [];
  mensaje: string = '';

  constructor(private hospitalizationService: HospitalizationListService) {}

  ngOnInit(): void {
    this.loadHospitalizations();
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
}
