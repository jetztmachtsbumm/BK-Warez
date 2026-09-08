import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { DeviceFormComponent } from '../device-form/device-form.component';
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
export class DeviceAddComponent {
  private readonly deviceService = inject(DeviceService);
  private readonly router = inject(Router);

  $nextId: Observable<number> = this.deviceService.getNextAvailableId();

  save(value: DeviceDTO): void {
    this.deviceService.addDevice(value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error adding device:', error);
      }
    });
  }
}
