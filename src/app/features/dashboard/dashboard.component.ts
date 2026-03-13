import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIMENG_IMPORTS } from '../../shared/ui/primeng/primeng.module';
import { DashboardService } from './dashboard.service';
import { PageResponse } from '../../shared/models/page/page-response';
import { AddressResponse } from '../../shared/models/address/address-response';
import { TableLazyLoadEvent } from 'primeng/table';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ...PRIMENG_IMPORTS
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    protected dashboardService: DashboardService
  ) { }

  pageResult?: PageResponse<AddressResponse>;

  loading: boolean = false;

  ngOnInit(): void {
  }

  loadAddresses(event: TableLazyLoadEvent) {

    const rows = event.rows ?? 10;
    const first = event.first ?? 0;
    const page = Math.floor(first / rows);

    setTimeout(() => this.loading = true);

    this.dashboardService.loadAddresses(page)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(response => {
        this.pageResult = response;
      });
  }

  navigateToAddressForm() {
    this.dashboardService.navigateToAddressForm();
  }
}
