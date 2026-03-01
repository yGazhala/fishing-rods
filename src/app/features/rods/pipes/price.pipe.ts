import { Pipe, PipeTransform } from '@angular/core';
import { Price } from '../types/price';
import { displayNumber } from '../../../utils/display-number';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  public transform(price?: Price): string {
    if (price) {
      return `${displayNumber(price.value)} ${price.currencyCode}`;
    }
    return '--';
  }
}
