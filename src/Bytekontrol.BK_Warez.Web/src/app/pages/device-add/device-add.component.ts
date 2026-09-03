import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceFormComponent, DeviceFormValue } from '../device-form/device-form.component';

@Component({
  selector: 'app-device-add',
  standalone: true,
  imports: [DeviceFormComponent],
  templateUrl: './device-add.component.html',
  styleUrl: './device-add.component.scss'
})
export class DeviceAddComponent {
  private readonly router = inject(Router);

  save(value: DeviceFormValue): void {
    // TODO: persist the new device (e.g. via a service/API call).
    this.router.navigate(['/']);
  }
}
