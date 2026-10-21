export interface Device {
  id: number;
  createdAt: string;
  category: string;
  name: string;
  manufacturer: string;
  details: string;
  serialNumber: string;
  remarks: string;
  delivered: boolean;
  deliveryDate: string | null;
  archived: boolean;
}

export interface DeviceDTO extends Omit<Device, 'id'> {}

export type DeviceColumn = keyof Device;
