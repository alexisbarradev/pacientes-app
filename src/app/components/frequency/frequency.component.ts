import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {
  patientId: string = '';
  chart: any;
  currentValue: number = 0; // 📡 Guarda el último dato generado

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
    this.initializeChart();
    this.updateChart();
  }

  initializeChart() {
    const ctx = document.getElementById('frequencyChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array(20).fill(''),  // Puntos iniciales
        datasets: [{
          label: 'Frecuencia Cardíaca',
          data: Array(20).fill(0),
          borderColor: '#00FF00',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          fill: false
        }]
      },
      options: {
        animation: false,
        scales: {
          x: { display: false },
          y: {
            suggestedMin: 50,
            suggestedMax: 150,
            ticks: { color: '#00FF00' },
            grid: { color: '#333' }
          }
        },
        plugins: {
          legend: { labels: { color: '#00FF00' } }
        }
      }
    });
  }

  updateChart() {
    setInterval(() => {
      // 🔄 Generar un nuevo punto aleatorio
      const newPoint = Math.floor(Math.random() * (130 - 70 + 1) + 70);

      // Actualizar el número mostrado
      this.currentValue = newPoint;

      // Actualizar el gráfico
      this.chart.data.datasets[0].data.push(newPoint);
      this.chart.data.datasets[0].data.shift();

      this.chart.update();
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/hospitalizaciones']);
  }
}
