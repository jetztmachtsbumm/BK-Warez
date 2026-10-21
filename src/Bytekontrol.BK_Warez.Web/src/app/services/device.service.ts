import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device, DeviceDTO } from '../models/device.model';
import { PagedResult } from '../models/paged-result.model';
import { environment } from '../../environments/environment';

export interface DeviceQuery {
  page: number;
  pageSize: number;
  searchTerm?: string;
  sortColumn?: string;
  sortDescending?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getAllDevices(query: DeviceQuery) {
    let params = new HttpParams()
      .set('page', query.page)
      .set('pageSize', query.pageSize);

    if (query.searchTerm) {
      params = params.set('searchTerm', query.searchTerm);
    }

    if (query.sortColumn) {
      params = params
        .set('sortColumn', query.sortColumn)
        .set('sortDescending', !!query.sortDescending);
    }

    return this.http.get<PagedResult<Device>>(`${environment.apiUrl}/devices`, { params });
  }

  getDeviceById(id: string) {
    return this.http.get<Device>(`${environment.apiUrl}/devices/${id}`);
  }

  getNextAvailableId(){
    return this.http.get<number>(`${environment.apiUrl}/devices/nextId`);
  }

  getManufacturers(){
    return this.http.get<string[]>(`${environment.apiUrl}/manufacturers`);
  }

  getDeviceTypes(){
    return this.http.get<string[]>(`${environment.apiUrl}/device-types`);
  }

  addDevice(device: DeviceDTO) {
    return this.http.post(`${environment.apiUrl}/devices`, {device: device});
  }

  updateDevice(id: number, device: DeviceDTO) {
    return this.http.put(`${environment.apiUrl}/devices`, {id: id, device: device});
  }
}
