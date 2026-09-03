import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Device, DeviceColumn } from '../../models/device.model';

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent {
  private readonly router = inject(Router);

  readonly columns: { key: DeviceColumn; label: string }[] = [
    { key: 'id', label: 'Id' },
    { key: 'createdAt', label: 'Anlagedatum' },
    { key: 'category', label: 'Gattung' },
    { key: 'name', label: 'Bezeichnung' },
    { key: 'details', label: 'Details' },
    { key: 'serialNumber', label: 'Seriennummer' },
    { key: 'remarks', label: 'Bemerkung' },
  ];

  devices: Device[] = [];
  searchTerm = '';
  sortColumn: DeviceColumn = 'id';
  sortDirection: SortDirection = 'asc';

  get filteredDevices(): Device[] {
    const term = this.searchTerm.trim().toLowerCase();

    const filtered = term
      ? this.devices.filter((device) =>
          Object.values(device).some((value) => String(value).toLowerCase().includes(term))
        )
      : this.devices;

    const column = this.sortColumn;
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    return [...filtered].sort(
      (a, b) => direction * String(a[column]).localeCompare(String(b[column]), 'de', { numeric: true })
    );
  }

  sortBy(column: DeviceColumn): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  openDevice(device: Device): void {
    this.router.navigate(['/geraete', device.id, 'bearbeiten']);
  }
}
