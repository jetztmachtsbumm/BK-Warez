import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bkId',
  standalone: true,
})
export class BkIdPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    return `BK${value.toString().padStart(4, '0')}`;
  }
}
