import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Centro de Relajación y SPA';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  salir(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
