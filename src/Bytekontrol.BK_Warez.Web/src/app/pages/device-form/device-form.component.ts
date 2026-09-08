import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Device, DeviceDTO } from '../../models/device.model';
import { Observable } from 'rxjs';

function todayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function emptyDevice(): DeviceDTO {
  return {
    createdAt: todayIsoDate(),
    category: '',
    name: '',
    details: '',
    serialNumber: '',
    remarks: ''
  };
}

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './device-form.component.html',
  styleUrl: './device-form.component.scss'
})
export class DeviceFormComponent implements OnChanges {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() submitLabel = 'Speichern';
  @Input() backLink = '/';
  @Input() initialValue: Partial<Device> | null = null;
  @Input() nextId: Observable<number> | null = null;

  @Output() readonly formSubmit = new EventEmitter<DeviceDTO>();

  readonly categories = ['Werkzeug', 'Maschine', 'Messgerät', 'Fahrzeug', 'Zubehör', 'Sonstiges'];

  device: DeviceDTO = emptyDevice();
  deviceId: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue']) {
      const { id, ...rest } = this.initialValue ?? {};
      this.device = { ...emptyDevice(), ...rest };

      if (id) {
        this.deviceId = id;
      }
    }

    if (!this.initialValue?.id && changes['nextId']) {
      this.nextId?.subscribe((nextId) => {
        this.deviceId = nextId;
      });
    }
  }

  submit(): void {
    this.formSubmit.emit(this.device);
  }
}
