import { Routes } from '@angular/router';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { DeviceAddComponent } from './pages/device-add/device-add.component';

export const routes: Routes = [
  { path: '', component: DeviceListComponent },
  { path: 'geraete/neu', component: DeviceAddComponent },
  { path: '**', redirectTo: '' }
];
