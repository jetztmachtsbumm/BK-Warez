export interface Device {
  id: number;
  createdAt: string;
  category: string;
  name: string;
  details: string;
  serialNumber: string;
  remarks: string;
  delivered: boolean;
  archived: boolean;
}

export interface DeviceDTO extends Omit<Device, 'id'> {}

export type DeviceColumn = keyof Device;
