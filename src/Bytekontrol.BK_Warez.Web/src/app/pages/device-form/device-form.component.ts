import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Device } from '../../models/device.model';

export type DeviceFormValue = Omit<Device, 'id'>;

const EMPTY_DEVICE: DeviceFormValue = {
  createdAt: new Date().toISOString().slice(0, 10),
  category: '',
  name: '',
  details: '',
  serialNumber: '',
  remarks: ''
};

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
  @Input() initialValue: DeviceFormValue | null = null;

  @Output() readonly formSubmit = new EventEmitter<DeviceFormValue>();

  readonly categories = ['Werkzeug', 'Maschine', 'Messgerät', 'Fahrzeug', 'Zubehör', 'Sonstiges'];

  device: DeviceFormValue = { ...EMPTY_DEVICE };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue']) {
      this.device = { ...EMPTY_DEVICE, ...this.initialValue };
    }
  }

  submit(): void {
    this.formSubmit.emit(this.device);
  }
}
