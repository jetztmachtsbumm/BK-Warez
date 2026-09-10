import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Device, DeviceDTO } from '../../models/device.model';
import { BkIdPipe } from '../../pipes/bk-id.pipe';
import { DeviceService } from '../../services/device.service';
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
    remarks: '',
    archived: false
  };
}

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BkIdPipe],
  templateUrl: './device-form.component.html',
  styleUrl: './device-form.component.scss'
})
export class DeviceFormComponent implements OnInit, OnChanges {
  private readonly deviceService = inject(DeviceService);

  @Input() title = '';
  @Input() subtitle = '';
  @Input() submitLabel = 'Speichern';
  @Input() backLink = '/';
  @Input() initialValue: Partial<Device> | null = null;
  @Input() nextId: Observable<number> | null = null;
  @Input() showSaveAndNew = false;
  @Input() showSaveAndCopy = false;
  @Input() showArchived = false;
  @Input() pendingAction: 'submit' | 'new' | 'copy' | null = null;
  @Input() initialToastMessage: string | null = null;

  @Output() readonly formSubmit = new EventEmitter<DeviceDTO>();
  @Output() readonly saveAndNew = new EventEmitter<DeviceDTO>();
  @Output() readonly saveAndCopy = new EventEmitter<DeviceDTO>();

  @ViewChild('serialNumberInput') serialNumberInput!: ElementRef<HTMLInputElement>;

  categories: string[] = [];

  device: DeviceDTO = emptyDevice();
  deviceId: number | null = null;

  toastVisible = false;
  toastMessage = '';
  private toastTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.deviceService.getDeviceTypes().subscribe((deviceTypes) => {
      this.categories = deviceTypes;
      this.serialNumberInput?.nativeElement.focus();
    });

    if (this.initialToastMessage) {
      this.showToast(this.initialToastMessage);
    }
  }

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

  submitAndNew(): void {
    this.saveAndNew.emit(this.device);
  }

  submitAndCopy(): void {
    this.saveAndCopy.emit(this.device);
  }

  resetForm(preserveData: boolean): void {
    this.device = preserveData ? { ...this.device } : emptyDevice();
    this.device.serialNumber = '';
    this.deviceId = null;
    this.nextId?.subscribe((nextId) => {
      this.deviceId = nextId;
    });

    this.showToast('Gerät wurde erfolgreich gespeichert.');
    this.serialNumberInput?.nativeElement.focus();
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    this.toastVisible = true;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => (this.toastVisible = false), 3000);
  }
}
