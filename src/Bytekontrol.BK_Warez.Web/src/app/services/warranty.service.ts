import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceWarranty } from '../models/device-warranty.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarrantyService {

  constructor(private http: HttpClient) { }

  getWarranty(serialNumber: string) {
    const params = new HttpParams().set('serialNumber', serialNumber);

    return this.http.get<DeviceWarranty>(`${environment.apiUrl}/warranty`, { params });
  }
}
