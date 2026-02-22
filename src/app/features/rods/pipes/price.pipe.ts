import { Pipe, PipeTransform } from '@angular/core';
import { Price } from '../types/price';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  public transform(price?: Price): string {
    if (price) {
      return `${price.value} ${price.currencyCode}`;
    }
    return '--';
  }
}
