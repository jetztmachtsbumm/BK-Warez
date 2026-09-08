import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceFormComponent } from '../device-form/device-form.component';
import { Device, DeviceDTO } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device-edit',
  standalone: true,
  imports: [DeviceFormComponent],
  templateUrl: './device-edit.component.html',
  styleUrl: './device-edit.component.scss'
})
export class DeviceEditComponent implements OnInit {

  initialValue: Device | null = null;

  constructor(private readonly deviceService: DeviceService, private readonly route: ActivatedRoute, private readonly router: Router) {}
  
  ngOnInit(): void {
    let deviceId = this.route.snapshot.paramMap.get('id');
    if (deviceId) {
      this.deviceService.getDeviceById(deviceId).subscribe((device) => {
        this.initialValue = device;
      });
    }
  }

  save(device: DeviceDTO): void {
    if(this.initialValue?.id) {
      this.deviceService.updateDevice(this.initialValue?.id, device).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
