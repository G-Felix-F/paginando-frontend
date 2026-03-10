import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../shared/models/login/login-request';

@Component({
    selector: 'app-login',
    imports: [
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    data: LoginRequest = { email: '', password: '' };

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    login() {

        this.authService.login({
            email: this.data.email,
            password: this.data.password
        }).subscribe({
            next: () => {
                console.log("Login realizado!");
                this.router.navigate(['/dashboard']);
            },
            error: err => {
                console.log("Erro no login", err);
            }
        });

    }

}