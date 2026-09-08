import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import type { Device, DeviceColumn } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly deviceService = inject(DeviceService);
  private readonly searchTerm$ = new Subject<string>();

  readonly columns: { key: DeviceColumn; label: string }[] = [
    { key: 'id', label: 'Id' },
    { key: 'createdAt', label: 'Anlagedatum' },
    { key: 'category', label: 'Gattung' },
    { key: 'name', label: 'Bezeichnung' },
    { key: 'details', label: 'Details' },
    { key: 'serialNumber', label: 'Seriennummer' },
    { key: 'remarks', label: 'Bemerkung' },
  ];

  readonly pageSizeOptions = [10, 20, 50, 100];

  devices: Device[] = [];
  searchTerm = '';
  sortColumn: DeviceColumn = 'id';
  sortDirection: SortDirection = 'asc';

  page = 1;
  pageSize = 20;
  totalCount = 0;
  loading = false;
  error = '';

  copyToastVisible = false;
  private copyToastTimeout?: ReturnType<typeof setTimeout>;

  constructor() {
    this.searchTerm$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(() => {
        this.page = 1;
        this.loadDevices();
      });
  }

  get totalPages(): number {
    return Math.max(Math.ceil(this.totalCount / this.pageSize), 1);
  }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.loading = true;
    this.error = '';

    this.deviceService
      .getAllDevices({
        page: this.page,
        pageSize: this.pageSize,
        searchTerm: this.searchTerm.trim(),
        sortColumn: this.sortColumn,
        sortDescending: this.sortDirection === 'desc',
      })
      .subscribe({
        next: (result) => {
          this.devices = result.items;
          this.page = result.page;
          this.pageSize = result.pageSize;
          this.totalCount = result.totalCount;
          this.loading = false;
        },
        error: () => {
          this.error = 'Geräte konnten nicht geladen werden.';
          this.loading = false;
        },
      });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.searchTerm$.next(term);
  }

  sortBy(column: DeviceColumn): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.page = 1;
    this.loadDevices();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) {
      return;
    }

    this.page = page;
    this.loadDevices();
  }

  previousPage(): void {
    this.goToPage(this.page - 1);
  }

  nextPage(): void {
    this.goToPage(this.page + 1);
  }

  changePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.loadDevices();
  }

  openDevice(device: Device): void {
    this.router.navigate(['/geraete', device.id, 'bearbeiten']);
  }

  copyToClipboard(value: string, event: Event): void {
    event.stopPropagation();

    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      this.copyToastVisible = true;
      clearTimeout(this.copyToastTimeout);
      this.copyToastTimeout = setTimeout(() => (this.copyToastVisible = false), 2000);
    });
  }
}
