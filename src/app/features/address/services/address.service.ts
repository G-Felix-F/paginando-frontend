import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormField } from '../../../shared/ui/models/form-field';
import { Observable } from 'rxjs';
import { AddressResponse } from '../../../shared/models/address/address-response';
import { AddressRequest } from '../models/address-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddressFormService {

  private ADDRESS_API: string = "http://localhost:8080/addresses";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createAddress(data: AddressRequest): Observable<AddressResponse> {
    return this.http.post<AddressResponse>(
      `${this.ADDRESS_API}`,
      data
    );
  }

  navigateToAddressDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
