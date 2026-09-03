import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceFormComponent, DeviceFormValue } from '../device-form/device-form.component';

@Component({
  selector: 'app-device-edit',
  standalone: true,
  imports: [DeviceFormComponent],
  templateUrl: './device-edit.component.html',
  styleUrl: './device-edit.component.scss'
})
export class DeviceEditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // TODO: load the actual device by this id via a service once available.
  readonly deviceId = this.route.snapshot.paramMap.get('id');

  // TODO: replace with the device loaded for deviceId.
  readonly initialValue: DeviceFormValue = {
    createdAt: '2023-03-14',
    category: 'Werkzeug',
    name: 'Akkuschrauber Bosch GSR 18V',
    details: '18V, inkl. 2 Akkus und Ladegerät',
    serialNumber: 'SN-2023-00114',
    remarks: ''
  };

  save(value: DeviceFormValue): void {
    // TODO: persist the updated device (e.g. via a service/API call).
    this.router.navigate(['/']);
  }
}
