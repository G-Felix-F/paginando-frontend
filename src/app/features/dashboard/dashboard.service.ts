import { Injectable } from '@angular/core';
import { UserResponse } from '../../shared/models/user/user-response';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { PageResponse } from '../../shared/models/page/page-response';
import { Observable } from 'rxjs';
import { AddressResponse } from '../../shared/models/address/address-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  private API: string = 'http://localhost:8080';

  rows: number = 10;

  loadAddresses(page: number = 0): Observable<PageResponse<AddressResponse>> {
    return this.http.get<PageResponse<AddressResponse>>(`${this.API}/addresses?page=${page}&size=${this.rows}`);
  }

  logout() {
    this.authService.logout();
  }

  navigateToAddressForm() {
    this.router.navigate(['/address-form']);
  }
}
