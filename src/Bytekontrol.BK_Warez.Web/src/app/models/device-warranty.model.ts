export interface DeviceWarranty{
    start: string;
    end: string;
    expired: boolean;
}

export type WarrantyStatus = 'none' | 'loading' | 'loaded' | 'error';
