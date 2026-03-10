import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../../shared/ui/primeng/primeng.module';
import { UserResponse } from '../../shared/models/user/user-response';
import { DashboardService } from './dashboard.service';
import { PageResponse } from '../../shared/models/page/page-response';
import { AddressResponse } from '../../shared/models/address/address-response';
import { LazyLoadEvent } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    PrimengModule
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
    this.loadAddresses({ first: 0, rows: this.dashboardService.rows });
  }

  loadAddresses(event: TableLazyLoadEvent) {

    const rows = event.rows ?? 10;
    const first = event.first ?? 0;
    const page = first / rows;

    this.loading = true;

    this.dashboardService.loadAddresses(page)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(res => {
        this.pageResult = {
          content: res.content || [],
          page: page,
          size: res.size || rows,
          totalElements: res.totalElements || 0,
          totalPages: res.totalPages
        }
      });
  }
}
