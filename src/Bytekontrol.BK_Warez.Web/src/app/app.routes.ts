import { Routes } from '@angular/router';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { DeviceAddComponent } from './pages/device-add/device-add.component';
import { DeviceEditComponent } from './pages/device-edit/device-edit.component';

export const routes: Routes = [
  { path: '', component: DeviceListComponent },
  { path: 'geraete/neu', component: DeviceAddComponent },
  { path: 'geraete/:id/bearbeiten', component: DeviceEditComponent },
  { path: '**', redirectTo: '' }
];
