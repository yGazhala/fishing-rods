import { Pipe, PipeTransform } from '@angular/core';
import { dateToShortDate } from '../../utils/date-to-short-date';

@Pipe({
  name: 'shortDate',
})
export class ShortDatePipe implements PipeTransform {
  public transform(date?: number | Date): string {
    if (!date) {
      return '--';
    }
    return dateToShortDate(date);
  }
}
