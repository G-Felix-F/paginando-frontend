import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/ui/dymanic-form/dynamic-form-component';
import { AddressFormService } from '../services/address.service';
import { FormField } from '../../../shared/ui/models/form-field';
import { AddressRequest } from '../models/address-request';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    DynamicFormComponent,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {

  constructor(private addressService: AddressFormService) { }

  fields: FormField[] = [
    {
      name: 'street',
      label: 'Street',
      type: 'text',
      placeholder: 'Street name',
      required: true
    },
    {
      name: 'number',
      label: 'Number',
      type: 'text',
      placeholder: 'House number',
      required: true
    },
    {
      name: 'complement',
      label: 'Complement',
      type: 'text',
      placeholder: 'Apartment, house...'
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      required: true
    },
    {
      name: 'zipCode',
      label: 'Zip Code',
      type: 'text',
      required: true
    }
  ];

  submitAddress(data: AddressRequest) {
    this.addressService.createAddress(data).subscribe({
      next: () => {
        console.log('Address created');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  navigateToAddressDashboard() {
    this.addressService.navigateToAddressDashboard();
  }
}
