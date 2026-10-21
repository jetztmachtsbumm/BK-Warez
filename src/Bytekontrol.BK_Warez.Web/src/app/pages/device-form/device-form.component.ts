import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Device, DeviceDTO } from '../../models/device.model';
import { DeviceWarranty, WarrantyStatus } from '../../models/device-warranty.model';
import { BkIdPipe } from '../../pipes/bk-id.pipe';
import { DeviceService } from '../../services/device.service';
import { forkJoin, Observable } from 'rxjs';

export function todayIsoDate(): string {
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
    manufacturer: '',
    details: '',
    serialNumber: '',
    remarks: '',
    delivered: false,
    deliveryDate: null,
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
  @Input() showArchivedAndDelivered = false;
  @Input() showWarranty = false;
  @Input() warranty: DeviceWarranty | null = null;
  @Input() warrantyStatus: WarrantyStatus = 'none';
  @Input() pendingAction: 'submit' | 'new' | 'copy' | null = null;
  @Input() initialToastMessage: string | null = null;

  @Output() readonly formSubmit = new EventEmitter<DeviceDTO>();
  @Output() readonly saveAndNew = new EventEmitter<DeviceDTO>();
  @Output() readonly saveAndCopy = new EventEmitter<DeviceDTO>();

  @ViewChild('serialNumberInput') serialNumberInput!: ElementRef<HTMLInputElement>;

  manufacturers: string[] = [];
  categories: string[] = [];

  device: DeviceDTO = emptyDevice();
  deviceId: number | null = null;

  toastVisible = false;
  toastMessage = '';
  private toastTimeout?: ReturnType<typeof setTimeout>;

  get warrantyState(): 'loading' | 'valid' | 'expired' | 'error' | 'none' | 'not-implemented' {
    if (this.warrantyStatus === 'loading') {
      return 'loading';
    }

    if (this.warrantyStatus === 'error') {
      return 'error';
    }

    if (this.warrantyStatus === 'loaded' && this.warranty) {
      return this.warranty.expired ? 'expired' : 'valid';
    }

    if(this.warrantyStatus === 'not-implemented'){
      return 'not-implemented';
    }

    return 'none';
  }

  ngOnInit(): void {
    const manufacturersObs = this.deviceService.getManufacturers();
    const deviceTypesObs = this.deviceService.getDeviceTypes();

    forkJoin([manufacturersObs, deviceTypesObs]).subscribe(([manufacturers, deviceTypes]) => {
      this.manufacturers = manufacturers;
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

  deliverDevice(): void {
    this.device.deliveryDate ??= todayIsoDate();
  }

  submit(): void {
    this.checkForEmptyDate();
    this.formSubmit.emit(this.device);
  }

  submitAndNew(): void {
    this.checkForEmptyDate();
    this.saveAndNew.emit(this.device);
  }

  submitAndCopy(): void {
    this.checkForEmptyDate();
    this.saveAndCopy.emit(this.device);
  }

  resetForm(preserveData: boolean): void {
    this.device = preserveData ? { ...this.device } : emptyDevice();
    this.device.serialNumber = '';
    this.device.createdAt = todayIsoDate();
    this.deviceId = null;
    this.nextId?.subscribe((nextId) => {
      this.deviceId = nextId;
    });

    this.showToast('Gerät wurde erfolgreich gespeichert.');
    this.serialNumberInput?.nativeElement.focus();
  }

  private checkForEmptyDate(){
    if(this.device.deliveryDate === '') this.device.deliveryDate = null;
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    this.toastVisible = true;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => (this.toastVisible = false), 3000);
  }
}
