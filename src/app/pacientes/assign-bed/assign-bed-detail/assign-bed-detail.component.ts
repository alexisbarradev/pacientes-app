import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-bed-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assign-bed-detail.component.html',
  styleUrls: ['./assign-bed-detail.component.css']
})
export class AssignBedDetailComponent {
  pacienteId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
