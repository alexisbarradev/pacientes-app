import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component'; // ✅ Importa el Navbar
import { FooterComponent } from './components/footer/footer.component'; // ✅ Importa el Footer

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent], // ✅ Asegúrate de incluir los componentes
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
