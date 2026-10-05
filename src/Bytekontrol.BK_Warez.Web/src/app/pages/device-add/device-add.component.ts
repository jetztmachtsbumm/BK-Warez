import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceFormComponent, todayIsoDate } from '../device-form/device-form.component';
import type { DeviceDTO } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device-add',
  standalone: true,
  imports: [DeviceFormComponent],
  templateUrl: './device-add.component.html',
  styleUrl: './device-add.component.scss'
})
export class DeviceAddComponent implements OnInit {
  private readonly deviceService = inject(DeviceService);
  private readonly router = inject(Router);

  @ViewChild(DeviceFormComponent) deviceFormComponent?: DeviceFormComponent;

  $nextId: Observable<number> = this.deviceService.getNextAvailableId();

  pendingAction: 'submit' | 'new' | 'copy' | null = null;
  initialValue: Partial<DeviceDTO> | null = null;
  initialToastMessage: string | null = null;

  ngOnInit(): void {
    const state = history.state as { prefillDevice?: DeviceDTO; successMessage?: string };

    if (state?.prefillDevice) {
      this.initialValue = { ...state.prefillDevice, createdAt: todayIsoDate() };
    }

    if (state?.successMessage) {
      this.initialToastMessage = state.successMessage;
    }
  }

  save(value: DeviceDTO): void {
    this.pendingAction = 'submit';
    this.deviceService.addDevice(value).subscribe({
      next: () => {
        this.router.navigate(['/'], { state: { successMessage: 'Gerät wurde erfolgreich gespeichert.' } });
      },
      error: (error) => {
        this.pendingAction = null;
        console.error('Error adding device:', error);
      }
    });
  }

  saveAndNew(value: DeviceDTO): void {
    this.pendingAction = 'new';
    this.deviceService.addDevice(value).subscribe({
      next: () => {
        this.pendingAction = null;
        this.deviceFormComponent?.resetForm(false);
      },
      error: (error) => {
        this.pendingAction = null;
        console.error('Error adding device:', error);
      }
    });
  }

  saveAndCopy(value: DeviceDTO): void {
    this.pendingAction = 'copy';
    this.deviceService.addDevice(value).subscribe({
      next: () => {
        this.pendingAction = null;
        this.deviceFormComponent?.resetForm(true);
      },
      error: (error) => {
        this.pendingAction = null;
        console.error('Error adding device:', error);
      }
    });
  }
}
