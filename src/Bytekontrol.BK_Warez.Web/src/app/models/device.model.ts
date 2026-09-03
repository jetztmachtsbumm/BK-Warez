export interface Device {
  id: number;
  createdAt: string;
  category: string;
  name: string;
  details: string;
  serialNumber: string;
  remarks: string;
}

export type DeviceColumn = keyof Device;
