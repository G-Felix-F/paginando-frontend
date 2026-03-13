import { Component } from '@angular/core';
import { RegisterRequest } from '../../shared/models/login/register-request';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  data: RegisterRequest = { name: '', email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register() {
    this.authService.register(this.data)
      .subscribe({
        next: (response) => {
          console.log("User created: ", response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error("Error creating user: ", error);
        }
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
