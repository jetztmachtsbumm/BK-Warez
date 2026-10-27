import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import type { Device, DeviceColumn } from '../../models/device.model';
import { BkIdPipe } from '../../pipes/bk-id.pipe';
import { DeviceService } from '../../services/device.service';

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BkIdPipe],
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
    { key: 'category', label: 'Typ' },
    { key: 'name', label: 'Bezeichnung' },
    { key: 'manufacturer', label: 'Hersteller' },
    { key: 'details', label: 'Details' },
    { key: 'serialNumber', label: 'Seriennummer' },
    { key: 'remarks', label: 'Bemerkung' },
    { key: 'delivered', label: 'Ausgeliefert' },
    { key: 'deliveryDate', label: 'Ausgeliefert am' },
    { key: 'archived', label: 'Archiviert' },
  ];

  readonly pageSizeOptions = [10, 20, 50, 100];

  private static readonly textMaxLength = 10;

  devices: Device[] = [];
  searchTerm = '';
  showDelivered = false;
  showArchived = false;
  sortColumn: DeviceColumn = 'id';
  sortDirection: SortDirection = 'asc';

  page = 1;
  pageSize = localStorage.getItem('pageSize') ? parseInt(localStorage.getItem('pageSize')!, 10) : 20;
  totalCount = 0;
  loading = false;
  error = '';

  copyToastVisible = false;
  private copyToastTimeout?: ReturnType<typeof setTimeout>;

  successToastVisible = false;
  successMessage = '';
  private successToastTimeout?: ReturnType<typeof setTimeout>;

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

    const successMessage = (history.state as { successMessage?: string })?.successMessage;
    if (successMessage) {
      this.successMessage = successMessage;
      this.successToastVisible = true;
      clearTimeout(this.successToastTimeout);
      this.successToastTimeout = setTimeout(() => (this.successToastVisible = false), 3000);
    }
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
        showDelivered: this.showDelivered,
        showArchived: this.showArchived,
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

  onShowDeliveredChange(value: boolean): void {
    this.showDelivered = value;
    this.page = 1;
    this.loadDevices();
  }

  onShowArchivedChange(value: boolean): void {
    this.showArchived = value;
    this.page = 1;
    this.loadDevices();
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

    localStorage.setItem('pageSize', pageSize.toString());
  }

  truncateText(value: string): string {
    if (!value || value.length <= DeviceListComponent.textMaxLength) {
      return value;
    }

    return value.slice(0, DeviceListComponent.textMaxLength).trimEnd() + '…';
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
