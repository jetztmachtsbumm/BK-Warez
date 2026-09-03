import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Device } from '../../models/device.model';

type NewDevice = Omit<Device, 'id'>;

@Component({
  selector: 'app-device-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './device-add.component.html',
  styleUrl: './device-add.component.scss'
})
export class DeviceAddComponent {
  private readonly router = inject(Router);

  readonly categories = ['Werkzeug', 'Maschine', 'Messgerät', 'Fahrzeug', 'Zubehör', 'Sonstiges'];

  device: NewDevice = {
    createdAt: new Date().toISOString().slice(0, 10),
    category: '',
    name: '',
    details: '',
    serialNumber: '',
    remarks: ''
  };

  save(): void {
    // TODO: persist the new device (e.g. via a service/API call).
    this.router.navigate(['/']);
  }
}
