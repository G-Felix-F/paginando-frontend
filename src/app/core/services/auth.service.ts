import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { TokenService } from './token.service';
import { LoginRequest } from '../../shared/models/login/login-request';
import { LoginResponse } from '../../shared/models/login/login-response';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../shared/models/login/register-request';
import { RegisterResponse } from '../../shared/models/login/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API: string = "http://localhost:8080/auth";

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API}/login`, data)
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.token);
        })
      );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API}/register`, data);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
